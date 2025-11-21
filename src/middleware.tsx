import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('UserToken')?.value;
  const user = request.cookies.get('UserData')?.value;

  const isLogin = !!token && !!user;
  const currentPath = request.nextUrl.pathname;

  // If logged in and trying to visit login/register → redirect to home
  if (isLogin && (currentPath === '/login' || currentPath === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If NOT logged in and accessing /user → redirect to login
  if (!isLogin && currentPath.startsWith('/user')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Paths to apply middleware
export const config = {
  matcher: ['/login', '/register', '/user/:path*'],
};
