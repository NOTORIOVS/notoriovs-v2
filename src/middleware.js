import { NextResponse } from 'next/server';

export function middleware(req) {
  let _fbc = req.cookies.get('_fbc');
  const fbclid = req.nextUrl.searchParams.get('fbclid');

  const res = NextResponse.next();

  if (!_fbc && fbclid) {
    const date = new Date();
    res.cookies.set({
      name: '_fbc',
      value: `fb.1.${Date.now()}.${fbclid}`,
      expires: new Date(date.setDate(date.getDate() + 7)),
    });
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (all public images)
     * - favicon.ico (favicon file)
     * - typetura (fluid typography script)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|typetura).*)',
  ],
};