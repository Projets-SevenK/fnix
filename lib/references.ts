export const PRODUCT_REF = 'FNIX-044';

/**
 * Generates a FNIX order reference in the format FNIX-044-XXX.
 * The order number is zero-padded to 3 digits.
 *
 * In Phase 2 (no database), the caller passes a random number (1–999).
 * In Phase 3 (Supabase), the caller passes the COUNT of existing orders + 1.
 *
 * @param orderNumber - A positive integer between 1 and 999.
 * @returns A reference string like "FNIX-044-001" or "FNIX-044-042".
 */
export function generateReference(orderNumber: number): string {
  const padded = String(orderNumber).padStart(3, '0');
  return `${PRODUCT_REF}-${padded}`;
}
