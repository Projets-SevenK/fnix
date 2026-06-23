import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase browser client.
 * Uses the public anon key — safe to expose in client components.
 * For mutations, use Server Actions with the server client instead.
 */
export const supabaseBrowser = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
