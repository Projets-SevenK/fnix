import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase/middleware';

/**
 * Protects all /admin/* routes except /admin/login.
 * Reads the session from cookies using the Supabase SSR client.
 * Unauthenticated users are redirected to /admin/login.
 * Authenticated users on /admin/login are redirected to /admin/commandes.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createMiddlewareClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/commandes', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
