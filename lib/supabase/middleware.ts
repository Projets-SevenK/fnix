import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';

/**
 * Creates a Supabase client for use in Next.js middleware (Edge Runtime).
 * Uses the public anon key only — never the service role key.
 * Required to read and refresh the user session from cookies.
 */
export function createMiddlewareClient(
  request: NextRequest,
  response: NextResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}
