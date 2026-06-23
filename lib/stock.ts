import { supabaseBrowser } from '@/lib/supabase/client';
import type { ProductStock } from '@/types/database';

/**
 * Reads the current stock for the FNIX Drop 044 product.
 * Uses the browser client — product_stock is publicly readable via RLS.
 * Returns null if no stock record is found or if a database error occurs.
 */
export async function getStock(): Promise<ProductStock | null> {
  const { data, error } = await supabaseBrowser
    .from('product_stock')
    .select('*')
    .eq('product_name', 'T-shirt FNIX Drop 044')
    .eq('size', 'M')
    .single();

  if (error) {
    console.error('[getStock] Supabase error:', error.message);
    return null;
  }

  return data as ProductStock;
}
