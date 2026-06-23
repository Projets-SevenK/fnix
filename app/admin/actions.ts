'use server';

import { updateOrderStatus, updateTrackingNumber } from '@/lib/orders';

/**
 * Server Action: marks an order as paid.
 *
 * Calls the PostgreSQL RPC `mark_order_paid` atomically:
 * - Changes payment_status from 'pending' to 'paid'.
 * - Decrements remaining_stock by 1.
 * - Guards against double decrement (only runs if order is currently 'pending').
 */
export async function setOrderPaid(
  id: string
): Promise<{ success: boolean; error?: string }> {
  return updateOrderStatus(id, 'paid');
}

/**
 * Server Action: cancels an order.
 * Sets payment_status to 'cancelled'. Does not affect stock.
 */
export async function cancelOrder(
  id: string
): Promise<{ success: boolean; error?: string }> {
  return updateOrderStatus(id, 'cancelled');
}

/**
 * Server Action: adds or updates the La Poste tracking number for an order.
 */
export async function setTrackingNumber(
  id: string,
  tracking: string
): Promise<{ success: boolean }> {
  return updateTrackingNumber(id, tracking);
}

/**
 * Server Action: marks an order as shipped.
 * Updates shipping_status to 'shipped'.
 */
export async function setOrderShipped(
  id: string
): Promise<{ success: boolean }> {
  const { supabaseServer } = await import('@/lib/supabase/server');

  const { error } = await supabaseServer
    .from('orders')
    .update({ shipping_status: 'shipped', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('[setOrderShipped] Update error:', error.message);
    return { success: false };
  }

  return { success: true };
}
