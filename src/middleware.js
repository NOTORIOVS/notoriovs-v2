import { NextResponse } from 'next/server';
import { extractUtm } from '@/utils/utm';

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

  // Guarda los UTMs de la visita (último toque) para que sigan disponibles
  // aunque el usuario navegue a otra página antes de enviar el formulario.
  const utm = extractUtm(req.nextUrl.searchParams);

  if (Object.keys(utm).length) {
    const date = new Date();
    res.cookies.set({
      name: 'utm',
      value: JSON.stringify(utm),
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