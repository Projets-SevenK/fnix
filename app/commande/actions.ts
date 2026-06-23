'use server';

import { orderSchema, type OrderFormValues } from '@/lib/validations/order';
import { createOrder } from '@/lib/orders';

/**
 * Server Action: submits an order form.
 *
 * Re-validates data on the server before calling createOrder,
 * regardless of client-side validation, to prevent tampered submissions.
 *
 * Returns { reference } on success, { error } on failure.
 */
export async function submitOrder(
  data: OrderFormValues
): Promise<{ reference: string } | { error: string }> {
  const parsed = orderSchema.safeParse(data);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? 'Données invalides.' };
  }

  return createOrder(parsed.data);
}
