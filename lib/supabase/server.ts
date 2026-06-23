// Ne jamais importer ce fichier dans un composant use client.
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase server client.
 * Uses the service role key — bypasses RLS.
 * Must only be used in Server Actions and server-side code.
 * Never expose this key client-side.
 */
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
