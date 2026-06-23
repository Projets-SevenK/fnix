import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Returns the authenticated Supabase user from the session cookie.
 * Uses the anon key — does NOT bypass RLS.
 * Call this at the top of every admin Server Action to verify the session.
 */
export async function getAdminUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Read-only context (middleware) — ignore
          }
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
