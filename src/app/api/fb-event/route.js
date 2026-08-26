import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export async function POST(request) {
  try {
    const referer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');
    const ip = request.headers.get('x-forwarded-for') || undefined;

    const body = await request.json();
    const {
      eventName,
      eventID,
      user,
      clientData,
      fbc: fbcFromBody,
      fbp: fbpFromBody,
      eventSourceUrl,
      actionSource,
    } = body;

    // Meta pide el email/telefono en minusculas y sin espacios antes de hashear.
    const hash = (value) => createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');

    // Si la llamada viene del navegador (fbEvents.js), _fbc/_fbp viajan como cookies
    // de la request. Si viene server-to-server (n8n disparando este endpoint al
    // crearse una cita en Pipedrive), no hay cookies: fbc/fbp deben llegar en el
    // body, tomados de lo que se guardo en Pipedrive cuando se creo el lead.
    const cookieStore = cookies();
    const fbc = fbcFromBody || cookieStore.get('_fbc')?.value;
    const fbp = fbpFromBody || cookieStore.get('_fbp')?.value;

    const userData = {
      em: user?.em ? [hash(user.em)] : undefined,
      ph: user?.ph ? [hash(user.ph)] : undefined,
      external_id: user?.externalID ? hash(user.externalID) : undefined,
      fbc,
      fbp,
      client_user_agent: userAgent,
      client_ip_address: ip,
    };

    const filteredUserData = Object.fromEntries(
      Object.entries(userData).filter(([_, value]) => value !== undefined)
    );

    const payload = {
      data: [
        {
          event_name: eventName,
          event_id: eventID,
          event_time: Math.floor(Date.now() / 1000),
          action_source: actionSource || 'website',
          event_source_url: eventSourceUrl || referer,
          user_data: filteredUserData,
          custom_data: clientData || {},
        },
      ],
      test_event_code: process.env.FB_CAPI_TEST_EVENT_CODE,
    };

    const url = `https://graph.facebook.com/v14.0/${process.env.PIXEL}/events?access_token=${process.env.FB_CAPI_TOKEN}`;

    const fbResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await fbResponse.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('FB error', error);
    return new Response(JSON.stringify({ error: 'Facebook API failed' }), {
      status: 500,
    });
  }
}
