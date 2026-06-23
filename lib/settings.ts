// Ne jamais importer ce fichier dans un composant use client.
import { supabaseServer } from '@/lib/supabase/server';
import type { AdminSettings } from '@/types/database';

/**
 * Reads the unique admin_settings record.
 * Returns null if the record does not exist or if a database error occurs.
 */
export async function getSettings(): Promise<AdminSettings | null> {
  const { data, error } = await supabaseServer
    .from('admin_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('[getSettings] Supabase error:', error.message);
    return null;
  }

  return data as AdminSettings;
}
