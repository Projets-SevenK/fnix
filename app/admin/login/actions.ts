'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server Action: authenticate an admin user.
 *
 * Uses @supabase/ssr createServerClient so session cookies are correctly
 * written to the response. On success, redirects to /admin/commandes.
 * On failure, redirects to /admin/login?error=... with a generic message —
 * never exposes the raw Supabase error.
 */
export async function loginAction(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    redirect(
      '/admin/login?error=' +
        encodeURIComponent('Email et mot de passe requis.')
    );
  }

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
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      '/admin/login?error=' +
        encodeURIComponent(
          'Identifiants incorrects. Vérifie ton email et ton mot de passe.'
        )
    );
  }

  redirect('/admin/commandes');
}
