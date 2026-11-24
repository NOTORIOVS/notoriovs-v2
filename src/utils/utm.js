// Sin dependencias de cliente: se usa tanto en src/middleware.js (edge) como
// en src/utils/getTrackingData.js (navegador).
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * @param {{ get?: (key: string) => string | null } | null | undefined} searchParams
 * @returns {Record<string, string>}
 */
export function extractUtm(searchParams) {
  const utm = {};

  UTM_KEYS.forEach((key) => {
    const value = searchParams?.get?.(key);
    if (value) utm[key] = value;
  });

  return utm;
}
