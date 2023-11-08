import { getCookie } from 'cookies-next';

export default function fbEvents(
  eventName,
  eventId = Date.now().toString()
) {

  fbq('track', eventName, {}, {fbc: getCookie('_fbc')});

  return {
    event_name: eventName,
    event_id: eventId,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: {
      fbc: getCookie('_fbc'),
      fbp: getCookie('_fbp'),
    },
  }
}