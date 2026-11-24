'use client';

import OptInForm from '@/components/opt-in-form';
import scrollDepth from '@/utils/scrollDepth';
import { useEffect, useState } from 'react';
import Faqs from '@/components/faqs';
import Link from 'next/link';
import { info } from '../../../../info';

// Landing v3.5 · Noviembre 2026 · La versión anterior (v3.4) vive en page.v3.4.backup.js

const CTA_TEXT = 'Vamos platicando, da clic!';
const CTA_MICROCOPY = 'Antes de prometerte cualquier cosa revisamos si hay una oportunidad real de trabajar juntos';
const TERMS_URL = '/terms-and-conditions';

// Pendiente: confirmar nombres, giros y permisos de cada cita antes de publicar.
const QUOTES = {
  davidCampana: {
    text: 'Pagué casi 6 meses a otra agencia, como 49,000 pesos, y no cayó nada! Nada es nada. No vendí nada. Con ustedes en el primer mes cerré 2 clientes.',
    author: 'David Nieves',
    role: 'Sconsi [Redes y ciberseguridad]',
  },
  davidCaliente: {
    text: 'No es que lleguen leads de gente curioseando. Llega el cliente caliente, el que sí te quiere comprar.',
    author: 'José Luis',
    role: 'Disalud [Distribuidora de insumos médicos]',
  },
  asesorAgencias: {
    text: 'Ya había trabajado con 2 o 3 agencias y todas traían la misma narrativa: no te puedo garantizar un resultado.',
    author: 'Luis Castañeda',
    role: 'LCV Aliados [Seguros e inversión patrimonial]',
  },
  asesorProceso: {
    text: 'El seguimiento y el proceso fueron adaptados específicamente a mi negocio.',
    author: 'Luis Castañeda',
    role: 'LCV Aliados [Seguros e inversión patrimonial]',
  },
  joseLuisApp: {
    text: 'El CRM y dashboard se les hicieron muy amigables: solo le muevo aquí, lo puedo hacer en mi cel',
    author: 'José Luis',
    role: 'Disalud [Distribuidora de insumos médicos]',
  },
  asesorTranquilidad: {
    text: 'Me hicieron entender de dónde se genera el resultado. Esa tranquilidad lo cambió todo.',
    author: 'Luis Castañeda',
    role: 'LCV Aliados [Seguros e inversión patrimonial]',
  },
  davidRecomienda: {
    text: 'Lo recomendaría abiertamente. No te venden espejitos, realmente dan resultados.',
    author: 'David Nieves',
    role: 'Sconsi [Redes y ciberseguridad]',
  },
};

const TESTIMONIOS = [
  {
    text: 'Ya me habían estafado dos veces. Decía: esto no jala, no va a jalar. Y mira qué sorpresa. Te puedo decir que el retorno es bueno. Me voy a quedar con ustedes.',
    author: 'David Nieves',
    role: 'Redes y Ciberseguridad',
  },
  {
    text: 'Desde el día uno empezaron a caer prospectos. Y hoy, 4 meses después, siguen cayendo y seguimos cerrando clientes.',
    author: 'José Luis',
    role: 'Distribuidora de Insumos Médicos',
  },
  {
    text: 'Tengo 1,200 seguidores y no importó, empecé a generar clientes desde el primer mes.',
    author: 'Luis Castañeda',
    role: 'Seguros e Inversión Patrimonial',
  },
  {
    text: 'No sé qué están haciendo pero todas las citas que he tenido han sido con gente muy bien perfilada. ¡Síganle!',
    author: 'Carlos FDC',
    role: 'Inversión en Bienes Raíces',
  },
];

const CREDENCIALES = [
  {num: '8', label: 'años transformando ads en ventas'},
  {num: '+120', label: 'negocios acompañados'},
  {num: '+1,000', label: 'dueños de negocio asesorados'},
];

const PROBLEMAS = [
  {
    titulo: 'Quien te hace las campañas no tiene idea de qué vendes',
    texto:
      'No sabe que le duele o con qué sueña tu cliente real. Y como no sabe a quién le vendes, no sabe como filtrar a los que no.',
  },
  {
    titulo: 'Te llegan puros preguntones',
    texto:
      'El problema no es que te escriba poca o mucha gente. Es que cuando por fin llega el bueno, piensas que es otro preguntón y nadie lo atiende bien.',
  },
  {
    titulo: 'Nadie sabe dónde se atoran tus prospectos',
    texto:
      'Llega el prospecto, le contestan 3 días después, te deja en visto o en el mejor de los casos dice “déjame lo pienso” y ahí muere.',
  },
];

const COMPARATIVA = [
  {
    label: 'Los reportes',
    agencia: 'Likes, alcance y costo por lead',
    notoriovs: 'Prospectos perfilados, cuántos avanzaron y cuántos compraron',
  },
  {
    label: 'La visibilidad',
    agencia: 'En el reporte de fin de mes',
    notoriovs: 'En un tablero que se actualiza en tiempo real',
  },
  // {
  //   label: 'Qué te dice que costó',
  //   agencia: 'Mensajes de WhatsApp',
  //   notoriovs: 'Cada prospecto perfilado, cada cotización, cada venta cerrada',
  // },
  {
    label: 'La garantía',
    agencia: '“En marketing no hay garantías”',
    notoriovs: 'Un mínimo de prospectos perfilados acordado desde el inicio',
  },
  // {
  //   label: 'Si no llega al número',
  //   agencia: 'Te pide más presupuesto',
  //   notoriovs: 'Sigue trabajando sin cobrarte',
  // },
  {
    label: 'El amarre',
    agencia: 'Contrato forzoso de 6 o 12 meses',
    notoriovs: 'Sin plazo forzoso',
  },
];

const CASOS = [
  {
    label: 'Compra Casas USA · Bienes raíces',
    titulo: '$1.5M USD en propiedades cerradas en 6 meses',
    descripcion:
      'Llegaron con más de 1,000 propiedades, más de 10 agentes y cero operaciones documentadas. Reposicionamos la oferta como inversión consultiva y, con nuestra metodología y acompañamiento, reorganizaron su equipo en 2 setters y 1 closer.',
    principal: '6 meses · $1.5M USD transaccionados',
    secundaria: '120 prospectos perfilados al mes · $160 MXN por prospecto',
  },
  {
    label: 'AS Sistemas · Software B2B',
    titulo: '$1.26M MXN en contratos nuevos en 12 meses',
    descripcion:
      '12 años viviendo de referidos. $2M al año dependían de que sus clientes se acordaran de recomendarlos. Armamos su primer canal de clientes activo y un discurso que los separa de la competencia.',
    principal: '12 meses · 7 clientes nuevos',
    secundaria: '349 prospectos · $256 MXN por prospecto',
  },
  {
    label: 'Doble Acento · Comercializadora de decoración',
    titulo: '$400K MXN en cartera potencial de mayoreo en 8 semanas',
    descripcion:
      'Dos años persiguiendo el canal equivocado. Su negocio no era el ecommerce, era el mayoreo. Construimos una oferta para distribuidores y en menos de 60 días ya llegaban compradores por volumen.',
    principal: '8 semanas · 481 prospectos de mayoreo',
    secundaria: '$50 MXN por prospecto',
  },
];

const PROCESO = [
  {
    num: '01',
    titulo: 'Sesión de diagnóstico (100% gratis)',
    descripcion:
      'Revisamos tus campañas e inversión, y te decimos cuántos leads perfilados te garantizamos. Si no vemos una oportunidad real, te lo decimos y no te hacemos perder el tiempo.',
    quote: QUOTES.asesorProceso,
    nota: '¿Decides con un socio? Tráelo. Es más fácil decidir con los mismos números enfrente.',
  },
  {
    num: '02',
    titulo: 'La infraestructura: el armado inicial',
    descripcion:
      'Estrategia, landing, filtro, anuncios, primer mensaje automatizado, CRM y tu dashboard. Es un pago único, y todo queda listo antes lanzar la campaña.',
  },
  {
    num: '03',
    titulo: 'Días 1 a 90: resultados en tiempo real',
    descripcion:
      'Desde que se encienden los anuncios ves tus resultados en tiempo real y tu Account Manager te guía. Nada de esperar 6 meses para “ver si jala”.',
  },
  {
    num: '04',
    titulo: 'Día 90: decides qué sigue... con datos',
    descripcion:
      'Sabes cuánto te cuesta generar cada venta. Eso que tu agencia anterior nunca te supo decir. Con eso decidimos juntos el siguiente paso.',
  },
];

const NOSOTROS = [
  'Escribimos los guiones y armamos los anuncios',
  'Manejamos y optimizamos tus campañas en Meta',
  'Segmentamos para que solo te lleguen prospectos de tu zona',
  'Cuidamos las políticas de Meta para que tus anuncios no se caigan',
  'Mantenemos tu formulario, tus avisos, tu CRM y tu tablero',
];

const TU = [
  'Mantener la pauta mínima activa (la pagas directo a Meta)',
  'Atender a tus prospectos en el tiempo que acordemos',
  'Marcar qué pasó con cada uno: contactado, cotizado, ganado o perdido',
  'Aprobar materiales en 3 días hábiles',
];

const FAQ = [
  {
    q: '¿Neta trabajan gratis si no llegan?',
    a: 'Neta. Si no completamos tu mínimo de prospectos perfilados en 90 días, seguimos operando sin cobrarte la mensualidad hasta completarlos, por hasta 2 meses. La pauta la sigues pagando tú a Meta, porque es tuya. Y el pago único de armado no se regresa: ese trabajo ya quedó hecho y es con lo que operamos.',
  },
  {
    q: '¿Qué es un prospecto perfilado?',
    a: 'Alguien que respondió el formulario, cumple con el perfil de tu cliente (ticket, zona, tipo de empresa) y dejó sus datos de contacto. Un “¿precio?” no cuenta.',
  },
  // {
  //   q: '¿Qué tengo que hacer yo para que aplique?',
  //   a: 'Mantener la pauta mínima activa, marcar qué pasó con cada prospecto, atenderlos en el tiempo que acordemos y aprobar materiales a tiempo. Sin esos datos no hay forma de medir, ni para ti ni para nosotros.',
  // },
  {
    q: '¿Por qué no aplica para todos los negocios?',
    a: 'Porque no vamos a firmar un número que no podemos cumplir. Si tu negocio no tiene con qué atender a los prospectos o tu ticket no da para pagar la pauta, preferimos decírtelo antes de cobrarte.',
  },
  // {
  //   q: '¿Cuánto tengo que invertir?',
  //   a: 'Depende de tu negocio, y en la sesión te damos el número exacto. Lo que sí te adelantamos es cómo se arma: un pago único para dejar todo listo, una mensualidad que corre desde que se encienden tus anuncios y la pauta, que es desde $6,000 MXN al mes y la pagas tú directo a Meta.',
  // },
  {
    q: '¿Hay un pago inicial?',
    a: 'Sí. Armar todo (estrategia, landing, formulario, anuncios, CRM y tablero) tiene un pago único que te damos en la sesión, con tus números enfrente. La garantía cubre la mensualidad, no ese armado. Te lo decimos aquí para que no te enteres en la llamada.',
  },
  // {
  //   q: '¿Por qué no me dan precio desde aquí?',
  //   a: 'Porque no te vamos a cotizar a ciegas. Primero vemos si te podemos ayudar y con qué números. Te lo damos en la sesión, con tus datos enfrente.',
  // },
  // {
  //   q: '¿La sesión tiene costo?',
  //   a: 'No. Tiene un valor de $1,800 y para ti es 100% gratis, sin compromiso. Pero tampoco es para cualquiera: primero respondes el cuestionario y, si tu negocio califica, eliges horario.',
  // },
  {
    q: '¿Me amarran con un contrato forzoso?',
    a: 'No. No hay plazo forzoso. Si te quedas, es porque los números te convienen. Así de simple.',
  },
  // {
  //   q: '¿Qué pasa con mis anuncios si me voy?',
  //   a: 'Se quedan contigo. Los anuncios, los públicos, el pixel y todo el historial viven en tu cuenta de Meta. Nada de secuestrar cuentas.',
  // },
  {
    q: '¿En cuánto tiempo veo resultados?',
    a: 'Los primeros prospectos llegan en las primeras semanas después de encender los anuncios. En el mes 3 ya ves la tendencia y tienes tus números completos.',
  },
  // {
  //   q: '¿Tengo que grabar videos o hacer contenido?',
  //   a: 'No. Nosotros escribimos los guiones y armamos los anuncios. Si estás en la zona metropolitana de Guadalajara, incluye una sesión de grabación básica. Y no, no necesitas una superproducción: lo que importa es a quién le habla el anuncio.',
  // },
  // {
  //   q: '¿Y si Meta me rechaza los anuncios?',
  //   a: 'Operamos tu cuenta y conocemos las políticas, así que es raro. Pero seremos honestos: a Meta no la controla nadie. Si tu cuenta tiene una restricción, la resolvemos contigo, y mientras dure la garantía no aplica.',
  // },
  // {
  //   q: '¿Me van a llegar prospectos de otros estados?',
  //   a: 'No, si no vendes ahí. Segmentamos tus anuncios por zona y el formulario confirma la ubicación de cada prospecto.',
  // },
];

function Eyebrow({children}) {
  return <p className="-ft-2 text-brand-1 uppercase !mb-0">{children}</p>;
}

function Quote({quote, className = ''}) {
  return (
    <blockquote className={`border-l-[3px] border-brand-4 bg-neutral-900 p-8 md:p-10 ${className}`}>
      <p className="text-neutral-200 italic mb-4">“{quote.text}”</p>
      <p className="-ft-2 text-neutral-400 !mb-0">
        <span className="font-bold text-neutral-200">{quote.author}</span><br/>
        {quote.role}
      </p>
    </blockquote>
  );
}

function Firma() {
  return (
    <div className="flex items-center gap-6 pt-4">
      <img
        src="/images/fer-portrait.png"
        alt="Fernando, Director General de Notoriovs Studio"
        className="w-20 h-20 rounded-full object-cover border border-neutral-700"
      />
      <p className="text-neutral-100 !mb-0">
        <span className="font-bold">Fernando</span><br/>
        <span className="-ft-2 text-neutral-400">Director General<br/> Notoriovs Studio</span>
      </p>
    </div>
  );
}

export default function Home() {
  const [lastClick, setLastClick] = useState('');
  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  const CTA = ({cta = CTA_TEXT, origin, microcopy = CTA_MICROCOPY}) => {
    return (
      <div className="ft-2 w-full max-w-[40ch] mt-8 mx-auto flex flex-col z-20">
        <Link
          href="/#contact"
          onClick={() => setLastClick(origin)}
          className="button !bg-brand-3 !w-full mb-4 text-center"
        >
          {cta}
        </Link>
        {microcopy && (
          <p className="-ft-2 text-center text-neutral-400">{microcopy}</p>
        )}
      </div>
    );
  };

  return (
    <div className="pb-20 bg-black">
      {/* 0. HERO */}
      <div className="relative bg-[url('/images/backgrounds/bkg-5.jpg')] bg-cover bg-center">
        <section className="pt-40 pb-16 justify-center items-center z-1">
          <div className="ft-2 flex flex-col gap-10 max-w-[60ch] mx-auto">
            <p className="-ft-1 text-brand-1 text-center uppercase !mb-0">
              Agencia de captación de clientes
            </p>
            <h1 className="ft-8 text-white text-center !my-0">
              Te garantizamos un mínimo de leads PERFILADOS en 90 días. O seguimos trabajando gratis hasta
              conseguirlos.
            </h1>
            <p className="ft-3 text-brand-1 text-center font-bold !mb-0 sans">
              No, no nos volvimos locos. Y sí, va por escrito.
            </p>
            <p className="text-center text-neutral-100 !mb-0 sans">
              Instalamos un sistema de captación de prospectos con dinero e intención real de compra, sin preguntones y sin que tomes otro curso más
            </p>
            <CTA
              cta="Descubre si tu negocio califica"
              origin="hero"
            />

            {/*<p className="-ft-3 text-neutral-400 text-center max-w-[70ch] mx-auto">*/}
            {/*  *El armado inicial es un pago único que te damos en la sesión. La garantía cubre la mensualidad: seguimos*/}
            {/*  operando sin cobrártela hasta completar el mínimo, por hasta 2 meses. La pauta la sigues pagando tú*/}
            {/*  directo a Meta. Aplica con la pauta mínima activa, con el estado de cada prospecto registrado y con los*/}
            {/*  tiempos de atención acordados en tu contrato.{' '}*/}
            {/*  <Link href={TERMS_URL} className="underline text-neutral-300">Términos completos</Link>*/}
            {/*</p>*/}
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-16 bg-black/60">
            {CREDENCIALES.map((stat, i) => (
              <div key={i} className="w-full p-8 border border-neutral-700">
                <div className="ft-9 text-center font-black text-brand-1 mb-2">{stat.num}</div>
                <div className="-ft-2 text-center text-neutral-100 sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 1. DÉJAME ADIVINAR */}
      <section id="para-quien">
        <div className="reading-container">
          <Eyebrow>Para quién es esto</Eyebrow>
          <h2 className="text-neutral-100 !my-0">Déjame adivinar.</h2>
          <div className="text-neutral-100 flex flex-col gap-6">
            <p className="text-neutral-50">
              Tu negocio funciona. Tienes buen producto, clientes contentos y alguien que sabe vender.
              <br/><br/>
              Casi todas tus ventas del año llegaron por un conocido o el cliente de siempre que te
              volvió a llamar.
              <br/><br/>
              O sea: tu crecimiento depende de que alguien se acuerde de ti.
              <br/><br/>
              Hasta que un día decidiste contratar a una agencia y la decepción llegó...
              <br/><br/>
              Se la pasaron haciendo posts y reportes de likes cada fin de mes.<br/>
              También te consiguieron un montón de {'"info"'} y {'“presio”'} que no te pagaron ni un peso.
              <br/><br/>
              Y al final, solo era {'"hay que esperar a que el algoritmo aprenda"'}.
            </p>
          </div>
          <Quote quote={QUOTES.davidCampana}/>
        </div>
        <CTA origin="dejame-adivinar"/>
      </section>

      {/* 2. EL PROBLEMA DE FONDO */}
      <section id="problema">
        <div className="reading-container mb-12">
          <Eyebrow>El problema de fondo</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Los anuncios sí funcionan. Lo que falla es <span className="text-brand-1">todo lo que pasa
            alrededor</span>.
          </h2>
          {/*<p className="text-neutral-100">*/}
          {/*  Más pauta sí trae más gente. Pero si quien la maneja no entiende tu negocio, no filtra y no mide, nomás te*/}
          {/*  trae más de lo mismo: más preguntones y más prospectos que se pierden en el camino.*/}
          {/*</p>*/}
          <p className="text-neutral-100">
            Casi siempre, una empresa como la tuya pierde ventas por tres razones. Ninguna se arregla con un post más
            bonito.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          {PROBLEMAS.map((p, i) => (
            <div key={i} className="flex flex-col gap-6 p-8 md:p-10 border border-neutral-700">
              <p className="ft-8 font-bold text-brand-1/50 !mb-0">{i + 1}</p>
              <h3 className="text-neutral-100 !my-0">{p.titulo}</h3>
              <p className="text-neutral-300 !mb-0">{p.texto}</p>
            </div>
          ))}
        </div>

        <div className="reading-container !border-t-0 !mt-0">
          <p className="text-neutral-100">
            <span className="font-bold text-brand-1">Por eso trabajamos al revés:</span> <br/>
            - Filtramos antes de que te escriban<br/>
            - Te notificamos en cuanto llega alguien que sí califica<br/>
            - Medimos cada paso hasta que cierres la venta
          </p>
          <Quote quote={QUOTES.davidCaliente}/>
        </div>
        <CTA origin="problema" />
      </section>

      {/* 2b. UNA NOTA DE FERNANDO */}
      <section id="nota-fernando">
        <div className="reading-container">
          <Eyebrow>Una nota de Fernando</Eyebrow>
          <div className="bg-neutral-900 border border-neutral-700 p-8 md:p-12 flex flex-col gap-6 text-neutral-100">
            <p className="text-neutral-100">
              Llevo 8 años frente a dueños de negocios que ya le pagaron a una o dos agencias. Casi todos me
              dicen lo mismo: “me entregaron posts bonitos y nunca supe cuánto me costó un cliente”.
            </p>
            <p className="text-neutral-100">
              Nosotros no vendemos likes ni seguidores. Somos operadores de publicidad: manejamos tus anuncios para que
              te lleguen leads que sí compran, y te enseñamos en todo momento el costo y el retorno de tu inversión.
            </p>
            <Firma/>
          </div>
        </div>
      </section>

      {/* 3. LA AGENCIA DE SIEMPRE CONTRA NOTORIOVS */}
      <section id="diferencia">
        <div className="reading-container mb-12">
          <Eyebrow>La diferencia</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Otras agencias vs los Notoriovs
          </h2>
        </div>

        <div className="w-full border border-neutral-700">
          <div className="hidden md:grid grid-cols-3 bg-neutral-900">
            <div className="p-6"/>
            <p className="p-6 -ft-1 uppercase text-neutral-400 !mb-0">La agencia de siempre</p>
            <p className="p-6 -ft-1 uppercase text-brand-1 !mb-0">Notoriovs</p>
          </div>
          {COMPARATIVA.map((row, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-3 border-t border-neutral-700">
              <p className="col-span-2 md:col-span-1 px-6 pt-6 md:p-6 font-bold text-neutral-100 !mb-0 sans">{row.label}</p>
              <div className="p-6">
                <p className="md:hidden -ft-3 uppercase text-neutral-500 !mb-2">La agencia de siempre</p>
                <p className="text-neutral-400 line-through decoration-neutral-600 !mb-0 -ft-2 sans">{row.agencia}</p>
              </div>
              <div className="p-6 bg-brand-1/5">
                <p className="md:hidden -ft-3 uppercase text-brand-1 !mb-2">Notoriovs</p>
                <p className="text-neutral-100 !mb-0 -ft-2 sans">{row.notoriovs}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reading-container !border-t-0 !mt-0">
          <Quote quote={QUOTES.asesorAgencias}/>
        </div>
        <CTA origin="comparativa"/>
      </section>

      {/* 4. CASOS DE NEGOCIO */}
      <section id="casos">
        <div className="reading-container mb-12">
          <Eyebrow>Casos de negocio</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Comercial. <span className="text-brand-1">No likes.</span>
          </h2>
          <p className="text-neutral-100">
            Estos clientes nos dejaron contar su caso. Con nombre, con cifras y sin redondear hacia arriba.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CASOS.map((caso, i) => (
            <div key={i} className="flex flex-col gap-6 bg-neutral-900 p-8 md:p-10">
              <p className="-ft-2 text-brand-1 !mb-0">{caso.label}</p>
              <h3 className="ft-5 text-neutral-100 !my-0">{caso.titulo}</h3>
              <p className="text-neutral-300 flex-grow !mb-0">{caso.descripcion}</p>
              <div className="border-t border-neutral-700 pt-6">
                <p className="ft-2 text-brand-1 font-bold !mb-2">{caso.principal}</p>
                <p className="-ft-2 text-neutral-500 italic !mb-0">{caso.secundaria}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reading-container !border-t-0 !mt-0">
          <h3 className="text-neutral-100 !my-0">
            Lo que dicen nuestros clientes (sin que se los pidiéramos dos veces)
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIOS.map((t, i) => (
            <Quote key={i} quote={t}/>
          ))}
        </div>
        <p className="-ft-3 text-neutral-500 text-center mt-8">
          Resultados de clientes reales. Cada negocio es distinto.
        </p>

        <CTA origin="study-cases"/>
      </section>

      {/* 5. QUÉ PASA DESPUÉS DE AGENDAR */}
      <section id="proceso">
        <div className="reading-container mb-12">
          <Eyebrow>El proceso</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Sin propuesta bonita. Sin speech. <span className="text-brand-1">Solo tus números.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {PROCESO.map((paso, i) => (
            <div key={i} className="flex flex-col gap-6 p-8 md:p-10 border border-neutral-700">
              <p className="ft-8 font-bold text-brand-1/50 !mb-0">{paso.num}</p>
              <h3 className="text-neutral-100 !my-0">{paso.titulo}</h3>
              <p className="text-neutral-300 !mb-0">{paso.descripcion}</p>
            </div>
          ))}
        </div>

        <CTA origin="process"/>
      </section>

      {/* 6. TÚ CIERRAS. NOSOTROS HACEMOS LA TALACHA. */}
      <section id="talacha">
        <div className="reading-container mb-12">
          <Eyebrow>Cero talacha</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            No vas a comprar otro curso de mkt digital. <span className="text-brand-1">Ni deberías.</span>
          </h2>
          <p className="text-neutral-100">
            Tu tiempo vale más cerrando que peleándote con la plataforma de anuncios a las 11 de la noche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 p-8 md:p-12 border border-brand-4 flex flex-col gap-6">
            <p className="-ft-1 uppercase text-brand-1 !mb-0">Lo que hacemos nosotros</p>
            <ul className="flex flex-col gap-4">
              {NOSOTROS.map((item, i) => (
                <li key={i} className="text-neutral-100 flex gap-3">
                  <span className="text-brand-3">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-neutral-900 p-8 md:p-12 border border-neutral-700 flex flex-col gap-6">
            <p className="-ft-1 uppercase text-neutral-400 !mb-0">Lo que te toca a ti</p>
            <ul className="flex flex-col gap-4">
              {TU.map((item, i) => (
                <li key={i} className="text-neutral-300 flex gap-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reading-container !border-t-0 !mt-0">
          <Quote quote={QUOTES.joseLuisApp}/>
          {/*<p className="ft-3 text-neutral-100 font-bold sans">Cuatro cosas de tu lado. Todo lo demás es nuestro.</p>*/}
        </div>
        <CTA origin="talacha"/>
      </section>

      {/* 7. LA GARANTÍA */}
      <section id="garantia">
        <div className="reading-container">
          <Eyebrow>Garantía</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Qué otra agencia te <span className="text-brand-1">pone por escrito esto</span>?
          </h2>
          <div className="border-2 border-brand-1 p-8 md:p-12 flex flex-col gap-6 text-neutral-100">
            <p className="ft-4 font-bold text-brand-1 !mb-0">Garantía de prospectos perfilados.</p>
            <p className="!mb-0 text-neutral-100">
              En la sesión de diagnóstico te decimos cuántos prospectos perfilados vas a recibir como mínimo en tus primeros
              90 días.
            </p>
            <p className="!mb-0 text-neutral-100">
              Si no llegamos, seguimos trabajando sin cobrarte una mensualidad hasta completarlos, por hasta 2 meses.
            </p>
          </div>

          <Quote quote={QUOTES.asesorTranquilidad}/>

        </div>
        <CTA origin="garantia"/>
      </section>

      {/* 8. PREGUNTAS FRECUENTES */}
      <section id="faq">
        <div className="reading-container mb-4">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="text-neutral-100 !my-0">
            Lo que siempre preguntan <span className="text-brand-1">(y lo que nadie te contesta derecho)</span>
          </h2>
        </div>
        <Faqs questions={FAQ}/>
      </section>

      {/* 9. CTA FINAL */}
      <section id="contact" className="reading-container">
        <h2 className="text-neutral-100 !my-0">
          Descubre cómo vamos a conseguir <span className="text-brand-1">más ventas</span> para tu negocio.
        </h2>
        <p className="text-neutral-100">
          Agenda una sesión de 30 minutos, 100% gratis (con valor de $1,800) y sin compromisos.
        </p>
        <p className="text-brand-1 font-bold">Solo para personas con hambre de crecer su negocio.</p>
        <OptInForm lastClick={lastClick}/>
        <p className="-ft-2 text-center text-neutral-400 italic">
          Antes de elegir horario respondes 9 preguntas (2 minutos). Así confirmamos que sí te podemos ayudar.
        </p>
      </section>

      {/* 9b. POSDATA */}
      <section id="posdata">
        <div className="reading-container">
          <div className="bg-neutral-900 border border-neutral-700 p-8 md:p-12 flex flex-col gap-6 text-neutral-100">
            <p className="text-neutral-100">
              <span className="font-bold text-brand-1">P.D.</span> Si llegaste hasta aquí y sigues con la duda, te
              entiendo. Ya te estafaron antes y lo último que quieres es otra agencia que te prometa la luna.
            </p>
            <p className="text-neutral-100">
              <span className="font-bold text-brand-1">P.P.D.</span> Lo peor que te puede pasar es salir de la sesión
              sabiendo cuántos prospectos te puede traer tu pauta. Que, por cierto, es justo lo que tu agencia anterior
              nunca te dijo.
            </p>
            <Firma/>
          </div>
        </div>
        <CTA cta="Ya, dale. Quiero mi sesión gratis" origin="posdata" microcopy={null}/>
      </section>

      {/* 10. LEGALES (dirección y contacto viven en el Footer global) */}
      <div className="text-center pt-12">
        <p className="-ft-3 text-neutral-500">
          <Link href={info.privacyNotice} className="underline">Aviso de privacidad</Link>
          {' · '}
          <Link href={TERMS_URL} className="underline">Términos de la garantía</Link>
        </p>
      </div>
    </div>
  );
}
