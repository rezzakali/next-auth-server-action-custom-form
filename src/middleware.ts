import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/signin' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';
  console.log(token);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/signin', '/signup'],
};
