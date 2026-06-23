import { supabaseServer } from '@/lib/supabase/server';
import { generateReference } from '@/lib/references';
import type { Order, PaymentStatus } from '@/types/database';
import type { OrderFormValues } from '@/lib/validations/order';

/**
 * Creates a new order in pending status.
 *
 * Business rules enforced:
 * - Stock is checked before insertion. If remaining_stock is 0 or is_available is false, the order is rejected.
 * - Stock is NOT decremented here. Stock decrements only when an admin marks an order as paid.
 * - The order reference is generated from a PostgreSQL sequence (orders_seq) to guarantee uniqueness.
 * - payment_status is always 'pending' on creation.
 * - shipping_status is always 'not_prepared' on creation.
 */
export async function createOrder(
  data: OrderFormValues
): Promise<{ reference: string } | { error: string }> {
  // 1. Check current stock
  const { data: stock, error: stockError } = await supabaseServer
    .from('product_stock')
    .select('remaining_stock, is_available')
    .eq('product_name', 'T-shirt FNIX Drop 044')
    .eq('size', 'M')
    .single();

  if (stockError) {
    console.error('[createOrder] Stock read error:', stockError.message);
    return { error: 'Impossible de vérifier le stock. Réessaie dans un moment.' };
  }

  if (!stock || stock.remaining_stock === 0 || stock.is_available === false) {
    return { error: 'Stock épuisé' };
  }

  // 2. Get the next sequence value for the reference via the helper RPC
  const { data: seqData, error: seqError } = await supabaseServer
    .rpc('get_next_order_seq');

  if (seqError || seqData === null) {
    console.error('[createOrder] Sequence error:', seqError?.message);
    return { error: 'Erreur lors de la génération de la référence.' };
  }

  const reference = generateReference(Number(seqData));

  // 3. Insert the order
  const { error: insertError } = await supabaseServer.from('orders').insert({
    reference,
    customer_first_name: data.customer_first_name,
    customer_last_name: data.customer_last_name,
    customer_email: data.customer_email,
    customer_phone: data.customer_phone,
    shipping_address: data.shipping_address,
    product_name: 'T-shirt FNIX Drop 044',
    size: 'M',
    quantity: data.quantity,
    amount_expected: 44.0,
    payment_status: 'pending',
    shipping_status: 'not_prepared',
    customer_note: data.customer_note ?? null,
  });

  if (insertError) {
    console.error('[createOrder] Insert error:', insertError.message);
    return { error: 'Erreur lors de la création de la commande. Réessaie dans un moment.' };
  }

  return { reference };
}

/**
 * Returns all orders, sorted by creation date descending.
 * For admin use only — must be called from a server context with the service role client.
 */
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabaseServer
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getOrders] Supabase error:', error.message);
    return [];
  }

  return (data ?? []) as Order[];
}

/**
 * Returns a single order by its UUID.
 * For admin use only — must be called from a server context.
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabaseServer
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[getOrderById] Supabase error:', error.message);
    return null;
  }

  return data as Order;
}

/**
 * Updates the payment status of an order.
 *
 * Business rule: if the new status is 'paid', the stock decrement is handled
 * atomically by the PostgreSQL function `mark_order_paid`, which also guards
 * against double decrement (it only runs if the order is currently 'pending').
 *
 * For 'cancelled', a simple UPDATE is performed — no stock is affected.
 */
export async function updateOrderStatus(
  id: string,
  status: PaymentStatus
): Promise<{ success: boolean; error?: string }> {
  if (status === 'paid') {
    const { error } = await supabaseServer.rpc('mark_order_paid', {
      p_order_id: id,
    });

    if (error) {
      console.error('[updateOrderStatus] mark_order_paid error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  const { error } = await supabaseServer
    .from('orders')
    .update({ payment_status: status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('[updateOrderStatus] Update error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Adds or updates the La Poste tracking number for an order.
 */
export async function updateTrackingNumber(
  id: string,
  tracking: string
): Promise<{ success: boolean }> {
  const { error } = await supabaseServer
    .from('orders')
    .update({ tracking_number: tracking, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('[updateTrackingNumber] Update error:', error.message);
    return { success: false };
  }

  return { success: true };
}
