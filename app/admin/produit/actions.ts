'use server';

import { supabaseServer } from '@/lib/supabase/server';
import type { AdminSettings } from '@/types/database';

type ImageField =
  | 'hero_image_url'
  | 'product_image_main_url'
  | 'product_image_secondary_1_url'
  | 'product_image_secondary_2_url';

const ALLOWED_IMAGE_FIELDS: ImageField[] = [
  'hero_image_url',
  'product_image_main_url',
  'product_image_secondary_1_url',
  'product_image_secondary_2_url',
];

function isImageField(value: string): value is ImageField {
  return ALLOWED_IMAGE_FIELDS.includes(value as ImageField);
}

/**
 * Updates text/price fields of admin_settings.
 * Allowed fields: description, prix, statut, wero_phone, wero_beneficiary_name,
 * wero_qr_code_url, instagram_url.
 *
 * Image URL columns are intentionally excluded here — use uploadProductImage instead.
 */
export async function updateSettings(
  data: Partial<AdminSettings>
): Promise<{ success: boolean; error?: string }> {
  // Whitelist: never allow image fields or id/updated_at to be set via this action
  const safeFields: (keyof AdminSettings)[] = [
    'product_description',
    'product_status',
    'product_price',
    'shipping_price',
    'wero_phone',
    'wero_beneficiary_name',
    'wero_qr_code_url',
    'instagram_url',
  ];

  const payload: Partial<AdminSettings> = {};
  for (const field of safeFields) {
    if (field in data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (payload as any)[field] = (data as any)[field];
    }
  }

  if (Object.keys(payload).length === 0) {
    return { success: false, error: 'Aucun champ valide fourni.' };
  }

  const { error } = await supabaseServer
    .from('admin_settings')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .not('id', 'is', null); // Update the single existing row

  if (error) {
    console.error('[updateSettings] Supabase error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Uploads an image to the 'product-images' Supabase Storage bucket,
 * then updates the corresponding column in admin_settings.
 *
 * imageField must be one of the 4 allowed image columns.
 */
export async function uploadProductImage(
  formData: FormData,
  imageField: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!isImageField(imageField)) {
    return { success: false, error: 'Champ image non autorisé.' };
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return { success: false, error: 'Aucun fichier reçu.' };
  }

  if (file.size === 0) {
    return { success: false, error: 'Le fichier est vide.' };
  }

  // Derive extension from MIME type or original name
  const nameParts = file.name.split('.');
  const extension = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'jpg';
  const filename = `${imageField}-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabaseServer.storage
    .from('product-images')
    .upload(filename, file, { upsert: true });

  if (uploadError) {
    console.error('[uploadProductImage] Upload error:', uploadError.message);
    return { success: false, error: uploadError.message };
  }

  const { data: publicUrlData } = supabaseServer.storage
    .from('product-images')
    .getPublicUrl(filename);

  const publicUrl = publicUrlData.publicUrl;

  const { error: updateError } = await supabaseServer
    .from('admin_settings')
    .update({ [imageField]: publicUrl, updated_at: new Date().toISOString() })
    .not('id', 'is', null);

  if (updateError) {
    console.error('[uploadProductImage] DB update error:', updateError.message);
    return { success: false, error: updateError.message };
  }

  return { success: true, url: publicUrl };
}

/**
 * Adjusts the remaining stock by calling the RPC adjust_stock.
 * The RPC enforces bounds (0 to initial_stock) and updates is_available.
 * This does NOT bypass the mark_order_paid rule — it is only for manual corrections.
 */
export async function adjustStock(
  remaining: number
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabaseServer.rpc('adjust_stock', {
    p_remaining: remaining,
  });

  if (error) {
    console.error('[adjustStock] RPC error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
