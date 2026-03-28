'use client';

import OptInForm from '@/components/opt-in-form';
import scrollDepth from '@/utils/scrollDepth';
import { useEffect, useState } from 'react';
import Faqs from '@/components/faqs';
import Link from 'next/link';

const CASOS = [
  {
    label: 'Compra Casas USA — Bienes raíces',
    titulo: '💰 De catálogo inmobiliario a consultora de inversión en dólares',
    descripcion:
      'Llegaron con 1,000+ propiedades, 10+ agentes y cero operaciones documentadas. Reenfocamos todo hacia Houston, reposicionamos la oferta como inversión consultiva y reconstruimos el equipo comercial a 2 setters + 1 closer.',
    metricas: [
      {valor: '6', detalle: 'Meses'},
      {valor: '$1.5M USD', detalle: 'en propiedades transaccionadas'},
      {valor: '120', detalle: 'leads calificados/mes<br/>$160 MXN CPL'},
    ],
  },
  {
    label: 'AS Sistemas — Desarrollo de software B2B',
    titulo: '💰 12 años viviendo de referidos. En 12 meses, 7 clientes nuevos.',
    descripcion:
      '$2,000,000 MXN anuales atados a que sus clientes se acordaran de recomendarlos. Construimos un discurso diferenciado y un sistema de captación activa desde cero — el primero en su historia.',
    metricas: [
      {valor: '12', detalle: 'Meses'},
      {valor: '$1.26M MXN', detalle: 'en contratos nuevos'},
      {valor: '349', detalle: 'Leads generados<br/>$256 MXN CPL'},
    ],
  },
  {
    label: 'Doble Acento — Distribución de decoración',
    titulo: '💰 2 años persiguiendo el canal equivocado. 8 semanas para encontrar el modelo real.',
    descripcion:
      'Nadie les había dicho la verdad: el ecommerce no era su negocio, lo era el mayoreo. Redirigimos el enfoque, construimos una oferta para distribuidores y en menos de 60 días el sistema generaba demanda calificada.',
    metricas: [
      {valor: '8', detalle: 'Semanas'},
      {valor: '481', detalle: 'Leads<br/>$50 MXN CPL'},
      {valor: '$400K MXN', detalle: 'en valor potencial de cartera'},
    ],
  },
  {
    label: 'Hoteles Encore — Cadena hotelera ejecutiva',
    titulo: '💰 Indicadores estables donde antes solo había likes',
    descripcion:
      'Cadena de 9 propiedades que llegó después de varias experiencias que no traían más que vanity metrics. Estabilizamos sus indicadores de captación y en 3 meses los números hablaron solos.',
    metricas: [
      {valor: '12', detalle: 'semanas'},
      {valor: '567', detalle: 'pre reservas generadas'},
      {valor: '$49.79', detalle: 'MXN costo por pre reserva'},
    ],
  },
];

const PROCESO = [
  {
    num: '01',
    titulo: 'Nos vamos conociendo',
    descripcion:
      'Una sesión corta para decirte si el problema que crees tener es el problema real y validar que te podemos ayudar La mayoría se sorprende.',
  },
  {
    num: '02',
    titulo: '45min que valen más que 6 meses de errores',
    descripcion:
      'Por Zoom, sin speech de ventas. Preguntamos lo que tu equipo no se pregunta, mapeamos en vivo el cuello de botella real y te decimos exactamente dónde se está fugando el dinero.',
  },
  {
    num: '03',
    titulo: 'Aquí ya nos ponemos a chambear',
    descripcion:
      'Construimos el sistema. Captación, nutrición, cierre. Cada pieza en su lugar, ejecutada por nuestro equipo o dirigida al tuyo — según lo que necesite tu negocio.',
  },
  {
    num: '04',
    titulo: 'Tu negocio crece y vivimos felices por siempre',
    descripcion:
      'Sabes cuántos leads entran, cuántos avanzan y cuántos cierran. Tu equipo tiene un proceso documentado. Los números dejan de ser una sorpresa y empiezan a ser una herramienta.',
  },
];

const FAQ = [
  {
    q: '¿Por qué cobran el diagnóstico si otras agencias lo hacen gratis?',
    a:
      'Porque un diagnóstico gratis no es un diagnóstico, es un pitch de ventas disfrazado. La Auditoría toma entre 15 y 20 horas de trabajo real: análisis de tu embudo, benchmark competitivo, proyecciones financieras y diseño de la arquitectura de tu sistema. Eso tiene un valor y un costo. Si pagarlo no hace sentido para ti en este momento, probablemente el plan mensual tampoco lo haría.',
  },
  {
    q: '¿Por qué no empezamos directo con el plan mensual?',
    a:
      'Porque sin diagnóstico no sabemos qué construir. Podríamos arrancarte campañas mañana mismo, pero si el problema real está en el cierre y no en la captación, estaríamos fabricando más leads que nadie va a convertir. Ya vimos eso antes. No lo volvemos a hacer.',
  },
  {
    q: '¿En cuánto tiempo veo resultados?',
    a:
      'Depende de dónde está el cuello de botella. Si el problema es captación, los primeros MQLs llegan en las primeras semanas. Si el problema es conversión, los resultados se ven cuando el proceso comercial está documentado e implementado, generalmente entre el mes 2 y el 3. La Auditoría te dice exactamente qué esperar y cuándo, antes de que firmes nada.',
  },
  {
    q: '¿Cómo aseguran los resultados?',
    a: 'Vamos midiendo semana tras semana indicadores que nos permiten ver focos rojos tanto en la captación de leads como en el seguimiento dado.',
  },
  {
    q: '¿Este sistema es para todos los negocios?',
    a: 'No, este sistema es para negocios que ya tengan un producto o servicio validado, con capacidad de comercial y ambición de crecimiento.',
  },
];

export default function Home() {
  const [lastClick, setLastClick] = useState('');
  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  const CTA = ({ cta = 'Ya dale click!', origin }) => {
    return (
      <div className="ft-2 max-w-[40ch] mt-8 mx-auto flex flex-col z-20">
        <Link
          href="/#contact"
          onClick={() => setLastClick(origin)}
          className="button !bg-brand-3 !w-full mb-4"
        >
          {cta}
        </Link>
        <p className="-ft-2 text-center text-neutral-400">
          Agenda una sesión gratuita para analizar tu proyecto
        </p>
      </div>
    );
  };

  return (
    <div className="pb-20 bg-black">
      {/* HERO */}
      <div className="relative bg-[url('/images/backgrounds/bkg-5.jpg')]">
        <section className="py-[16rem] justify-center items-center z-1">
          <div className="ft-2 flex flex-col gap-12 max-w-[60ch]">
            <p className="-ft-1 text-brand-1 text-center uppercase !mb-0">Direct-Response Marketing Studio</p>
            <h1 className="flex flex-col ft-10 text-white text-center !my-0">
              Como NITRO para tu embudo de ventas
            </h1>
            <p className="ft-2 text-white text-center">
              Antes de hacerte otras campañas, diagnosticamos en donde se te está yendo feria y construimos el puente
              entre marketing y tu proceso de ventas.
            </p>
          </div>
          <div
            className="w-full flex flex-col justify-center bottom-12 mt-auto mb-0 cursor-pointer absolute"
          >
            <span className="text-center text-gray-300">Para abajo</span>
            <span className="material-icons text-white mx-auto animate-bounce">expand_more</span>
          </div>
        </section>
      </div>

      {/* PROBLEMA */}
      <section id="problema">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1 mb-5">El problema de fondo</p>
          <h2 className="text-neutral-100">
            ¿Y si te digo que tus campañas no son el <span className="text-brand-1">único problema</span>?
          </h2>

          <p className="text-neutral-100">
            En los 8 años que llevamos chambeando en esto del marketing,
            nos hemos topado que, casi siempre, las empresas pierden ventas
            por una de 2:<br/><br/>
            1. Es muuuuy probable que quien te hace tus campañas nunca le entendido a tu negocio.<br/><br/>
            Y por eso llevas 3 meses pagando por unos posts bonitos que ni likes tienen y clientes... menos.<br/><br/>
            Y 2. Es que 9 de 10 empresas no tienen un proceso de ventas funcional.<br/><br/>
            Esto probablemente te esté pasando a ti y no lo sepas.<br/><br/>
            Sad but true...<br/><br/>
            Nosotros no le echamos más sal a esa herida.<br/><br/>
            Diagnosticamos tu negocio desde el día uno y construimos el sistema para que empieces a vender.
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-3">
            {[
              {num: '8', label: 'años diagnosticando y ejecutando estrategias de crecimiento'},
              {num: '20+', label: 'negocios escalados en 2025'},
              {num: '100+', label: 'clientes asesorados en 2025'},
            ].map((stat, i) => (
              <div key={i}
                   className="w-full p-8 border border-neutral-700">
                <div className="ft-11 text-center font-black text-brand-1 mb-2">
                  {stat.num}
                </div>
                <div className="-ft-2 text-center text-neutral-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CTA
          cta="Te suena? Dale click!"
          origin="problem"
        />
      </section>
      {/*<section className="mt-16">*/}
      {/*  <p className="ft-2 sans text-center py-8 px-12 bg-brand-1 rounded-2xl">*/}
      {/*    <span className="ft-4 font-bold">ADVERTENCIA:</span><br/>*/}
      {/*    Si la idea de invertir $20,000 al mes en crecer tu negocio todavía te parece un gran riesgo, probablemente te vamos a perjudicar más que ayudar.*/}
      {/*  </p>*/}
      {/*</section>
      */}

      {/* CASOS */}
      <section id="casos">
        <div className="reading-container mb-16">
          <p className="text-brand-1">Casos de negocio</p>
          <h2 className="text-neutral-100">
            Resultados que ya tienen <span className="text-brand-1">nombre</span>
          </h2>
          <p className="text-neutral-100">
            No somos de los que esconden números.<br/><br/>
            Estos son algunos clientes que nos dejaron contar los resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {CASOS.map((caso, i) => (
            <div key={i} className="flex flex-col gap-8 bg-neutral-900 p-8 md:p-10">
              <p className="-ft-2 text-brand-1">{caso.label}</p>
              <h3 className="text-neutral-100">
                {caso.titulo}
              </h3>
              <p className="text-neutral-100 flex-grow">
                {caso.descripcion}
              </p>
              <div className="border-t border-neutral-700 pt-6 grid grid-cols-5 gap-6">
                {caso.metricas.map((m, j) => (
                  <div key={j} className="first:col-span-1 col-span-2">
                    <p className="ft-4 text-brand-1 font-bold">
                      {m.valor}
                    </p>
                    <p className="-ft-2 text-neutral-500" dangerouslySetInnerHTML={{__html: m.detalle}}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <CTA
          cta="No quisieras ver tu marca aquí? Click!"
          origin="study-cases"
        />
      </section>

      {/* MODELO */}
      <section id="modelo" className="container">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1 mb-5">Cómo trabajamos</p>
          <h2 className="text-white font-display font-black leading-tight mb-8">
            Primero el <span className="text-brand-1">diagnóstico,</span> luego el sistema
          </h2>
          <p className="text-neutral-100">
            Nos cansamos de los planes mensuales que terminas contratando porque te endulzaron el oído bien
            perro.<br/><br/>
            Y es que...<br/>
            Hazte una pregunta:<br/>
            tú construirías tu casa así sin planos, ni un render, ni nada?<br/><br/>
            No creo...<br/><br/>
            Por eso todos los clientes entran por el mismo lugar:<br/><br/>
            una auditoría que pone todo sobre la mesa antes de gastar un peso en ejecución.<br/><br/>
            Después de la Auditoría, tú decides cómo quieres trabajar.<br/><br/>
            Así de simple.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          {/* Auditoría */}
          <div className="bg-neutral-900 p-16 border border-brand-4 flex flex-col gap-8">
            <p className="-ft-1 uppercase text-brand-1">Done With You</p>
            <h3 className="text-neutral-100">
              Acompañamiento
            </h3>
            <p className="text-neutral-300">Para empresas que tienen equipo propio pero necesitan dirección y
              supervisión continua. Tu equipo ejecuta, nosotros dirigimos.</p>
            <ul className="space-y-3">
              {[
                '4 sesiones mensuales vía Zoom',
                'Revisión de ads activos y KPIs de campañas',
                'Revisión del proceso de ventas y embudo comercial',
                'Recomendaciones concretas cada semana',
              ].map((item, i) => (
                <li key={i} className="text-neutral-100">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sistema */}
          <div className="bg-neutral-900 p-16 border border-white/10 flex flex-col gap-8">
            <p className="-ft-1 uppercase text-brand-1">Done For You</p>
            <h3 className="font-display font-black text-white leading-tight mb-3">
              Agencia
            </h3>
            <p className="text-neutral-300">El sistema completo ejecutado por nuestro equipo. Captación, nutrición y
              cierre. Nosotros construimos y operamos el sistema.</p>
            <ul className="space-y-3">
              {[
                'Sistema completo de captación y perfilamiento',
                'Campañas generadoras de leads',
                'Diseño y documentación del proceso de ventas',
                'CRM, secuencias y coaching mensual',
              ].map((item, i) => (
                <li key={i} className="text-neutral-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CTA
          cta="Tiene más sentido, no? Click!"
          origin="model"
        />

      </section>

      {/* AUDITORÍA PROCESO */}
      <section id="auditoria">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1">El Proceso Notoriovs</p>
          <h2 className="text-neutral-100">
            Lo que nadie te ha dicho todavía sobre tu negocio
          </h2>
          <p className="text-neutral-100">
            No arrancamos con una propuesta ni con una presentación bonita.<br/><br/>
            Arrancamos preguntando lo que nadie te ha preguntado.<br/><br/>
            Porque el problema casi nunca está donde crees que está.<br/><br/>
            Y cada semana sin saberlo, te está costando.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((paso, i) => (
            <div
              key={i}
              className={`flex flex-col gap-8 p-12 md:p-10 hover:bg-white/10 transition-colors border border-neutral-700`}
            >
              <p className="ft-8 font-bold text-brand-1/50">
                {paso.num}
              </p>
              <div>
                <h3 className="text-neutral-200 mb-4">
                  {paso.titulo}
                </h3>
                <p className="text-neutral-200">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        <CTA
          cta="Quieres conocer todo el proceso? Click!"
          origin="process"
        />
      </section>

      {/* PARA QUIÉN */}
      <section id="para-quien">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1">Para quién es esto</p>
          <h2 className="text-neutral-100">
            A ver si hacemos <span className="text-brand-1">match</span>
          </h2>
          <p className="text-neutral-100">
            No nos importa qué vendes, no somos de esos que se especializan en un nicho y le hacen la misma campaña a tu
            competencia.<br/><br/>
            Aunque chambeamos mejor con empresas que:<br/>
            — Cuenten con equipo comercial<br/>
            — Tengan ganas de estructurar su proceso de ventas<br/>
            — Vendan servicios B2B, Bienes raíces o tickets arriba de $10,000<br/><br/>
            Si vendes playeras de $200 o cupcakes de $50, seguro eres bien chido… pero no sé que tanto te podamos
            ayudar..<br/><br/>
            Y si el problema que traes es que los leads no se convierten o que te llegan suficientes...<br/><br/>
            Ya dale click al botón.</p>
          <CTA
            cta="Listo para chambear juntos? Click!"
            origin="target"
          />
        </div>
        <div
          className="border-l-[3px] border-brand-4 bg-neutral-800 p-20"
        >
          <p className="text-neutral-400 mb-8">
            {`"No sé qué están haciendo pero todas las citas que he tenido han sido con gente muy bien perfilada. ¡Síganle!"`}
          </p>
          <p className="-ft-2 text-neutral-500 text-right">— Director General, CompraCasasUSA</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1">Preguntas frecuentes</p>
          <h2 className="text-neutral-100">
            Lo que siempre preguntan
          </h2>
        </div>

        <Faqs questions={FAQ}/>

      </section>

      <section id="contact" className="reading-container">
        <p className="-ft-2 text-brand-1">Primer paso</p>
        <h2 className="text-neutral-100">
          Agenda tu diagnóstico de marketing gratuito y descubre en donde se te está yendo la feria
        </h2>
        <p className="text-neutral-100">Para garantizar que nuestros clientes cuenten con una estrategia óptima,
          solo seleccionamos los proyectos en los que podamos ayudar mejor.<br/><br/>
          Pero ya llegaste hasta acá…<br/><br/>
          Regálanos unos datos y agenda una cita para analizar tu proyecto.</p>
        <OptInForm lastClick={lastClick}/>
      </section>
    </div>
  );
}
