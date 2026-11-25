'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import fbEvent from '@/services/fbEvents';
import Faqs from '@/components/faqs';
import Quote from '@/components/quote';
import { info } from '../../../../info';

// Página para descalificados v1.1 · Noviembre 2026
// Sustituye a /not-elegible (recomendación a 3Cuartos AG). Al descalificado nunca se le habla
// de Pulso ni de Notoriovs 90 en esta página.

const PRICE = '$1,800';

// PENDIENTE: confirmar que este es el WhatsApp del setter.
const SETTER_WHATSAPP = info.whatsapp.value;
const SETTER_MESSAGE = 'Hola, me salió que no califico pero creo que sí. Este es mi negocio: ...';

// Mientras no exista el link de pago (Stripe o Mercado Pago) integrado al calendario de
// Fernando, el pago y el agendado se cierran por WhatsApp.
const PAYMENT_MESSAGE = `Hola, quiero pagar mi sesión de números de 1 hora con Fernando (${PRICE} MXN) y elegir horario.`;
const PAYMENT_URL = `https://wa.me/${SETTER_WHATSAPP}?text=${encodeURIComponent(PAYMENT_MESSAGE)}`;

const QUOTE = [
  {
    text: 'Me hicieron entender de dónde se genera el resultado. Esa tranquilidad lo cambió todo.',
    author: 'Luis Castañeda',
  },
  {
    text: 'Me dio 2 que tres tips para manejar mejor mi negocio. En cuestión de Marketing. Si creo hace cosas distintas que otras agencias.',
    author: 'Cristina Davila',
  },
  {
    text: 'Ya con el análisis me di cuenta que solo necesitaba subir a la pauta sin pagarle extra a una agencia',
    author: 'Paul',
  },
  {
    text: 'Dejé de inventar el hilo negro y me di cuenta que afinando el proceso comercial puedo cerrar más clientes',
    author: 'Alejandro Serrano',
  },
];

const QUE_TE_LLEVAS = [
  {
    titulo: 'Revisamos tus números de los últimos 3 meses.',
    texto:
      'Cuántos prospectos te llegan, cuánto te cuesta cada uno, cuántos cierras y cuánto te cuesta conseguir un cliente. Si no tienes alguno de esos datos, lo calculamos juntos. Y si no existe, también es un hallazgo.',
  },
  {
    titulo: 'Revisamos lo que ya estás haciendo.',
    texto:
      'Tus anuncios, tus redes o la forma en que le das seguimiento a quien te escribe. Lo que esté funcionando se queda; lo que no, te digo por qué.',
  },
  {
    titulo: 'Encontramos dónde se te atora la venta.',
    texto:
      '¿Te llega poca gente? ¿Te llega mucha pero no compra? ¿Compra pero nadie le da seguimiento? Te digo cuál de las tres es la tuya.',
  },
  {
    titulo: 'Te digo cuánto estás dejando ir.',
    texto: 'En pesos, al mes. No en likes ni en alcance.',
  },
  {
    titulo: 'Te llevas tu Mapa de Números.',
    texto:
      'Una página, en tu correo en las siguientes 48 horas: tus números, tu cuello de botella y 3 acciones para los próximos 30 días. Están pensadas para que las hagas tú, sin contratarnos.',
  },
];

const PROCESO = [
  {
    num: '01',
    titulo: 'Pagas y eliges horario',
    descripcion: `${PRICE} MXN con IVA incluido. Te facturamos si lo necesitas.`,
  },
  {
    num: '02',
    titulo: 'Nos mandas tus datos',
    descripcion:
      'Antes de la sesión te llega un formulario corto: cuántos prospectos te llegaron, cuánto invertiste y cuántos cerraste en los últimos 3 meses. Así la hora se usa para trabajar, no para preguntar.',
  },
  {
    num: '03',
    titulo: 'Sesión de 1 hora por Zoom, conmigo',
    descripcion: 'Tú, yo y tus números. Si decides con un socio, tráelo.',
  },
  {
    num: '04',
    titulo: 'Recibes tu Mapa de Números',
    descripcion: 'En las siguientes 48 horas.',
  },
];

const FAQ = [
  {
    q: '¿Por qué me cobran si la página decía gratis?',
    a: 'Porque la sesión gratis es para negocios que ya están listos para invertir en anuncios cada mes. Ahí recupero mi tiempo cuando trabajamos juntos. Con el tuyo todavía no es el caso, así que te cobro la hora. A cambio, te llevas un plan que puedes hacer sin nosotros.',
  },
  {
    q: '¿Me van a querer vender algo al final?',
    a: 'Si con tus números veo que ya puedes trabajar con nosotros, te lo digo. Si no, no. Te vas con tu Mapa y listo.',
  },
  {
    q: '¿Y si no tengo mis números?',
    a: 'Los estimamos juntos en la sesión. Un negocio que no sabe cuánto le cuesta un cliente ya tiene su primer hallazgo.',
  },
  {
    q: '¿Quién me atiende?',
    a: 'Yo, Fernando, Director General de Notoriovs. No un vendedor ni un asistente.',
  },
  {
    q: '¿Puedo cambiar el horario?',
    a: 'Sí, hasta 24 horas antes de la sesión. Si no te conectas y no avisaste, la sesión se pierde.',
  },
  {
    q: '¿Me dan factura?',
    a: 'Sí. El precio ya incluye IVA.',
  },
];

function Eyebrow({children}) {
  return <div><p className="-ft-2 text-brand-1 uppercase !mb-0">{children}</p></div>;
}

function Firma() {
  return (
    <div className="flex items-center gap-6 pt-4">
      <img
        src="/images/fer-portrait.png"
        alt="Fernando, Director General de Notoriovs Studio"
        className="w-32 h-32 rounded-full object-cover border border-neutral-700"
      />
      <p className="text-neutral-100 !mb-0">
        <span className="font-bold sans">Fernando Méndez</span><br/>
        <span className="-ft-2 text-neutral-400">Director de Estrategia</span>
      </p>
    </div>
  );
}

function trackCheckout(origin) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {value: 1800, currency: 'MXN', content_name: 'Mapa de Números', origin});
  }
}

function PayCTA({origin, cta = 'Elegir horario', microcopy}) {
  return (
    <div className="ft-2 w-full max-w-[40ch] mt-8 mx-auto flex flex-col z-20">
      <a
        href={PAYMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCheckout(origin)}
        className="button !bg-brand-3 !w-full mb-4 text-center"
      >
        {cta}
      </a>
      {microcopy && <p className="-ft-2 text-center text-neutral-400">{microcopy}</p>}
    </div>
  );
}

export default function MapaDeNumeros() {
  const waLink = `https://wa.me/${SETTER_WHATSAPP}?text=${encodeURIComponent(SETTER_MESSAGE)}`;

  useEffect(() => {
    const lead = JSON.parse(getCookie('lead') || '{}');
    fbEvent('Not Elegible', {phone: lead?.phone, email: lead?.email, externalID: lead?.id});
  }, []);

  return (
    <div className="pb-20 bg-black">
      {/* 0. HERO */}
      <div className="relative">
        <section className="pt-40 pb-16 justify-center items-center z-1">
          <div className="ft-2 flex flex-col gap-10 max-w-[60ch] mx-auto">
            <h1 className="ft-8 text-white text-center !my-0 tracking-tighter">
              HMMM... 🤔
            </h1>
            <p className="ft-6 font-bold text-center text-neutral-100 !mb-0 sans tracking-tighter">
              Con base en tus ventas y tu ticket promedio, si te vendemos un plan, la neta te estaríamos robando.
            </p>
            <p className="ft-2 text-center text-neutral-100 !mb-0 sans">
              Peeero... lo que sí te puede convenir: una hora conmigo, revisando tus campañas y resultados actuales para darte un plan de acción para los próximos 30 días.
            </p>
            <div className="flex justify-center">
              <Firma/>
            </div>
            <p className="ft-4 text-center text-white font-bold !mb-0 sans">
              {PRICE} MXN <span className="text-neutral-400 font-normal ft-1">· IVA incluido</span>
            </p>
          </div>
          <PayCTA
            origin="hero"
            microcopy="Te atendemos por WhatsApp: ahí pagas, eliges horario y te mandamos la confirmación."
          />
        </section>
      </div>

      <section id="revision">
        <div className="reading-container">
          <div>
            <p className="ft-4 text-neutral-300 font-bold extended !mb-2">Nos equivocamos?</p>
            <p className="text-neutral-400 !mb-0">
              ¿Tu negocio sí invierte en anuncios o respondiste algo que no te describe bien?
              Escríbenos y lo revisamos.{' '}
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="underline text-neutral-200">
              Mándanos un WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* 1. UNA NOTA DE FERNANDO */}
      <section id="nota-fernando">
        <div className="reading-container">
          <Eyebrow>Una nota de Fernando</Eyebrow>
          <div className="bg-neutral-900 border border-neutral-700 p-8 md:p-12 flex flex-col gap-6 text-neutral-100">
            <p className="text-neutral-100">
              Llevo 8 años sentado frente a dueños de negocio que ya le pagaron a dos que tres agencias.<br/><br/>
              Casi todos con el mismo cuento: les vendieron un plan cuando su negocio todavía no daba para sostenerlo.<br/><br/>
              Pagaron meses de iguala y pauta, no vendieron, y ya dejaron de creer en lo bella que es la publicidad.<br/><br/>
              <b>Por eso... yo no voy a ser uno más que te rompe el corazón y la cartera.</b><br/><br/>
              Con los datos que nos compartiste, meterte a pagar una agencia hoy sería ponerte a chambear para ellos.<br/><br/>
              Lo que sí te puedo ofrecer es una hora revisando la situación comercial de tu negocio y un plan para que empiece a subir más agua a la nube.
            </p>

            <p className="text-neutral-100">
              Te prometo que vas a salir con una claridad perra sobre donde se te atoran las ventas.<br/><br/>
              Y si crees que fueron puras piñas... te regreso tu feria y ya.
            </p>
            <Firma/>
          </div>
        </div>
      </section>

      {/* 2. ¿NO QUE LA SESIÓN ERA GRATIS? */}
      {/*<section id="gratis">*/}
      {/*  <div className="reading-container">*/}
      {/*    <Eyebrow>Sin rodeos</Eyebrow>*/}
      {/*    <h2 className="text-neutral-100 !my-0">¿No que la sesión era gratis?</h2>*/}
      {/*    <p className="text-neutral-100">*/}
      {/*      Sí lo es, para los negocios que ya pueden invertir en anuncios todos los meses. En ellos recupero esa*/}
      {/*      hora cuando trabajamos juntos. Con el tuyo todavía no es el caso.*/}
      {/*    </p>*/}
      {/*    <p className="text-neutral-100">*/}
      {/*      Y ojo: es un {'“todavía no”'}, no un {'“no”'}. Muchos negocios están a un par de ajustes de estar*/}
      {/*      listos. La sesión sirve para saber cuáles son los tuyos.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* 3. QUÉ TE LLEVAS */}
      <section id="sesion">
        <div className="reading-container mb-12">
          <Eyebrow>La sesión</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Una hora. Tus números. <span className="text-brand-1">Un plan que puedes hacer tú solo.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {QUE_TE_LLEVAS.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col gap-6 p-8 md:p-10 border border-neutral-700 ${
                i === QUE_TE_LLEVAS.length - 1 ? 'md:col-span-2 bg-brand-1/5' : ''
              }`}
            >
              <p className="ft-8 font-black extended text-brand-1/50 !mb-0">0{i + 1}</p>
              <h3 className="text-neutral-100 sans !my-0">{item.titulo}</h3>
              <p className="text-neutral-300 !mb-0">{item.texto}</p>
            </div>
          ))}
        </div>
        <PayCTA origin="sesion"/>
      </section>

      {/* 4. CÓMO FUNCIONA */}
      {/*<section id="proceso">*/}
      {/*  <div className="reading-container mb-12">*/}
      {/*    <Eyebrow>El proceso</Eyebrow>*/}
      {/*    <h2 className="text-neutral-100 !my-0">Cómo funciona</h2>*/}
      {/*  </div>*/}

      {/*  <div className="grid grid-cols-1 md:grid-cols-2">*/}
      {/*    {PROCESO.map((paso) => (*/}
      {/*      <div key={paso.num} className="flex flex-col gap-6 p-8 md:p-10 border border-neutral-700">*/}
      {/*        <p className="ft-8 font-black extended text-brand-1/50 !mb-0">{paso.num}</p>*/}
      {/*        <h3 className="text-neutral-100 sans !my-0">{paso.titulo}</h3>*/}
      {/*        <p className="text-neutral-300 !mb-0">{paso.descripcion}</p>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* 5. PRUEBA SOCIAL */}
      <section id="testimonio">
        <div className="reading-container">
          {QUOTE.map((q, i) => <Quote key={i} quote={q}/>)}
        </div>
      </section>

      {/* 6. GARANTÍA */}
      <section id="garantia">
        <div className="reading-container">
          <Eyebrow>Sin letras escondidas</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Si no sales con 3 acciones claras, <span className="text-brand-1">te regreso tus {PRICE}.</span>
          </h2>
          <div className="border-2 border-brand-1 p-8 md:p-12 flex flex-col gap-6 text-neutral-100">
            <p className="!mb-0 text-neutral-100">
              Me lo dices al terminar la sesión: “Fer esto fue puro pedo, gracias por nada”, te creo y te regreso tu feria.
            </p>
            <p className="!mb-0 text-neutral-100">
              <span className="font-bold text-brand-1">Y si después contratas:</span> si en los siguientes 30 días
              contratas cualquiera de nuestros servicios, te descontamos los {PRICE}.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES */}
      <section id="faq">
        <div className="reading-container mb-4">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="text-neutral-100 !my-0">Lo que seguro te estás preguntando</h2>
        </div>
        <Faqs questions={FAQ}/>
      </section>

      {/* 9. CTA FINAL */}
      <section id="cta-final">
        <div className="reading-container">
          <h2 className="text-neutral-100 !my-0">
            El que no mide, adivina. <span className="text-brand-1">Deja de adivinar.</span>
          </h2>
          <p className="text-neutral-100">
            Una hora conmigo, un plan de 3 acciones y tu dinero de vuelta si no te sirve.
          </p>
        </div>
        <PayCTA origin="final" cta={`Pagar y elegir horario · ${PRICE}`}/>
      </section>


      <div className="text-center pt-12">
        <p className="-ft-3 text-neutral-500">
          <Link href={info.privacyNotice} className="underline">Aviso de privacidad</Link>
        </p>
      </div>
    </div>
  );
}
