import { getCookie } from 'cookies-next';
import { extractUtm } from '@/utils/utm';

// Lee los parámetros UTM de la URL, las cookies de Meta Pixel (_fbc/_fbp) y
// la cookie "utm" que guarda src/middleware.js (respaldo si la URL actual ya no
// trae UTMs) y la cookie "lead" que guarda src/components/opt-in-form.js al enviar el
// formulario.
function readJsonCookie(name) {
  const raw = getCookie(name);
  if (!raw) return undefined;

  try {
    return JSON.parse(String(raw));
  } catch {
    return undefined;
  }
}

/**
 * @param {{ get?: (key: string) => string | null } | null | undefined} searchParams
 *   URLSearchParams o el resultado de useSearchParams().
 */
export default function getTrackingData(searchParams) {
  let utm = extractUtm(searchParams);

  if (!Object.keys(utm).length) {
    utm = readJsonCookie('utm') ?? {};
  }

  const fbc = getCookie('_fbc') ?? '';
  const fbp = getCookie('_fbp') ?? '';
  const lead = readJsonCookie('lead');

  return { utm, fbc, fbp, lead, shouldRedirect: !lead };
}
