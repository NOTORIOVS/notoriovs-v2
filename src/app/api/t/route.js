export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    console.log('[SG]', await req.text());
  } catch (e) {
    console.log('[SG_ERR]', String(e));
  }
  return new Response(null, { status: 204 });
}