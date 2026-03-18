'use client';

import OptInForm from '@/components/opt-in-form';
import scrollDepth from '@/utils/scrollDepth';
import { useEffect } from 'react';
import Faqs from '@/components/faqs';

const CASOS = [
  {
    label: 'Compra Casas USA — Bienes raíces',
    titulo: 'De catálogo inmobiliario a consultora de inversión en dólares',
    descripcion:
      'Llegaron con 1,000+ propiedades, 10+ agentes y cero operaciones documentadas. Reenfocamos todo hacia Houston, reposicionamos la oferta como inversión consultiva y reconstruimos el equipo comercial a 2 setters + 1 closer.',
    metricas: [
      {valor: '6', detalle: 'Meses'},
      {valor: '$1.5M USD', detalle: 'en propiedades transaccionadas'},
      {valor: '120', detalle: 'leads calificados/mes · $160 MXN CPL'},
    ],
  },
  {
    label: 'AS Sistemas — Desarrollo de software B2B',
    titulo: '12 años viviendo de referidos. En 12 meses, 7 clientes nuevos.',
    descripcion:
      '$2,000,000 MXN anuales atados a que sus clientes se acordaran de recomendarlos. Construimos un discurso diferenciado y un sistema de captación activa desde cero — el primero en su historia.',
    metricas: [
      {valor: '12', detalle: 'Meses'},
      {valor: '$1.26M MXN', detalle: 'en contratos nuevos'},
      {valor: '349', detalle: 'Leads generados · $256 MXN CPL'},
    ],
  },
  {
    label: 'Doble Acento — Distribución de decoración',
    titulo: '2 años persiguiendo el canal equivocado. 8 semanas para encontrar el modelo real.',
    descripcion:
      'Nadie les había dicho la verdad: el ecommerce no era su negocio, lo era el mayoreo. Redirigimos el enfoque, construimos una oferta para distribuidores y en menos de 60 días el sistema generaba demanda calificada.',
    metricas: [
      {valor: '8', detalle: 'Semanas'},
      {valor: '481', detalle: 'Leads · $50 MXN CPL'},
      {valor: '$400K MXN', detalle: 'en valor potencial de cartera'},
    ],
  },
  {
    label: 'Hoteles Encore — Cadena hotelera ejecutiva',
    titulo: 'Indicadores estables donde antes solo había likes',
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
    titulo: 'Calificación',
    descripcion:
      'Una sesión corta donde validamos que efectivamente te podemos ayudar. Si tus objetivos, industria y contexto encajan, te agendamos la sesión de diagnóstico.',
  },
  {
    num: '02',
    titulo: 'Diagnóstico',
    descripcion:
      '45 minutos por Zoom. Sin speech de ventas a huevo. Preguntamos, escuchamos y mapeamos en vivo dónde está el cuello de botella real de tu empresa.',
  },
  {
    num: '03',
    titulo: 'Render',
    descripcion:
      'Te entregamos la arquitectura del sistema que necesitas y una hoja de ruta de 90 días con prioridades, responsables y proyección financiera en tres escenarios.',
  },
  {
    num: '04',
    titulo: 'Hallazgos',
    descripcion:
      'Una sesión de cierre donde te explicamos cada módulo, resolvemos dudas y te mostramos exactamente qué se implementa en el siguiente paso y por qué. Sin sorpresas.',
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
];

export default function Home() {
  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', 'Scroll', {depth: value}),
    });
  });

  return (
    <div className="pb-20 bg-black">
      {/* HERO */}
      <div className="relative bg-[url('/images/backgrounds/bkg-5.jpg')]">
        <section className="min-h-screen justify-center items-center z-1">
          <div className="flex flex-col gap-8">
            <p className="-ft-1 text-brand-1 mb-12">Guadalajara, México — Anti-Agencia de Marketing</p>
            <h1
              className="ft-10 text-white  mb-12"
            >
              No somos la agencia<br/>
              que te dice lo que<br/>
              <span className="text-brand-1">quieres escuchar</span>
            </h1>
            <p className="ft-2 text-neutral-100 max-w-[60ch]">
              Somos los que te dicen qué está roto en tu negocio y qué necesitas hacer antes de gastar un peso más.
            </p>
            <p className="ft-2 text-white">
              Advertencia: trabajar con nosotros puede ser incómodo.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#contacto"
                className="button flex-grow"
              >
                Quiero mi consultoría
              </a>
              <a
                href="#modelo"
                className="button-secondary !text-brand-1 flex-grow md:flex-grow-0"
              >
                Ver cómo funciona ↓
              </a>
            </div>
          </div>
          <div
            className="w-full flex flex-col justify-center bottom-40 md:bottom-20 mt-auto mb-0 cursor-pointer absolute"
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
            ¿Y si te digo que tus campañas no son <span className="text-brand-1">el problema</span>?
          </h2>

          <p className="text-neutral-100">
            Llevamos 8 años viendo cómo las empresas pierden oportunidades de negocio y no podemos seguir arreglando
            solo la mitad del problema.<br/><br/>
            La mayoría de empresas que nos buscan han contratado agencias, probado campañas,
            gastado en ads.
            <br/><br/>Generaron leads.
            <br/>Y nada.</p>
          <p className="text-neutral-100">
            El problema casi nunca es la captación.<br/><br/>
            Es que del otro lado no hay proceso.<br/><br/>
            Los leads llegan y se pierden en el limbo porque nadie sabe qué hacer con ellos, cuándo llamar, qué decir ni
            cómo cerrar.</p>
          <p className="text-neutral-100">
            Nosotros no le echamos más sal a esa herida.<br/><br/>
            Diagnosticamos tu negocio desde el día uno y construimos el sistema para que no pase.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {num: '8', label: 'años diagnosticando y ejecutando estrategias de crecimiento'},
              {num: '20+', label: 'clientes activos en servicios B2B, bienes raíces e industria'},
              {num: '100+', label: 'sesiones de diagnóstico realizadas en 2025'},
            ].map((stat, i) => (
              <div key={i}
                   className="p-8 border border-neutral-700">
                <div className="ft-11 font-black text-brand-1 mb-2">
                  {stat.num}
                </div>
                <div className="-ft-2 text-neutral-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELO */}
      <section id="modelo" className="container">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1 mb-5">Cómo trabajamos</p>
          <h2 className="text-white font-display font-black leading-tight mb-8">
            Primero el <span className="text-brand-1">diagnóstico,</span> luego el sistema
          </h2>
          <p className="text-neutral-100">
            Nos cansamos de los planes mensuales donde nadie sabe qué se está comprando.<br/><br/>
            Por eso todos los clientes entran por el mismo lugar:<br/><br/>
            un diagnóstico que pone todo sobre la mesa antes de gastar un peso en ejecución.<br/><br/>
            Sin diagnóstico, no hay plan mensual.<br/><br/>
            Así de simple.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          {/* Auditoría */}
          <div className="bg-neutral-900 p-10 border border-brand-4 flex flex-col gap-8">
            <p className="-ft-2 text-brand-1">Paso 1 — Prerequisito</p>
            <h3 className="text-neutral-100">
              Auditoría de Crecimiento Comercial
            </h3>
            <p className="text-neutral-100">
              El mapa completo de dónde está tu empresa y exactamente qué necesita para crecer. No opiniones, no
              generalidades. Diagnóstico ejecutivo con datos, métricas y una hoja de ruta de 90 días.
            </p>
            <ul className="space-y-3 my-10">
              {[
                'Sesión de diagnóstico de 45 min con el Director sin costo',
                'Entregable completo en 15 días hábiles',
                '10 módulos estructurados en 3 partes',
                'Proyección financiera en 3 escenarios',
                'Propuesta de implementación al final',
              ].map((item, i) => (
                <li key={i} className="text-neutral-100">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              className="button"
            >
              Agenda una sesión
            </a>
          </div>

          {/* Sistema */}
          <div className="bg-neutral-900 p-10 border border-white/10 flex flex-col gap-8">
            <p className="-ft-2 text-brand-1">Paso 2 — Solo con Auditoría previa</p>
            <h3 className="font-display font-black text-white leading-tight mb-3">
              Sistema de Adquisición y Cierre
            </h3>
            <p className="text-neutral-300 mb-8">
              El sistema completo de captación y cierre, ejecutado por nuestro equipo. Motor de demanda para generar
              leads calificados. Motor de cierre para que tu equipo los convierta en clientes.
            </p>
            <ul className="space-y-3">
              {[
                'Estrategia, ads, media buying y copywriting',
                'Quizzes de perfilamiento y bases de datos',
                'MQLs calificados entregados al equipo comercial',
                'Diseño y documentación del proceso de ventas',
                'CRM, scripts, cadencias y coaching mensual',
              ].map((item, i) => (
                <li key={i} className="text-neutral-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AUDITORÍA PROCESO */}
      <section id="auditoria">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1">La Auditoría de Crecimiento Comercial</p>
          <h2 className="text-neutral-100">
            Así funciona<br/>el <span className="text-brand-1">proceso</span>
          </h2>
          <p className="text-neutral-100">
            No arrancamos con una propuesta. <br/><br/>
            Arrancamos con una conversación. <br/><br/>
            Primero entendemos qué está pasando, luego construimos el mapa y al final te decimos exactamente qué hacer
            con él.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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

        <p className="text-neutral-500 mt-6">
          $36,000 MXN — entregable completo en 15 días hábiles a partir de la sesión.
        </p>
      </section>

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
                    <p className="-ft-2 text-neutral-500">
                      {m.detalle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section id="para-quien">
        <div className="reading-container mb-16">
          <p className="-ft-2 text-brand-1">Para quién es esto</p>
          <h2 className="text-neutral-100">
            Si creemos que en lugar de ayudarte, te vamos a perjudicar, te lo <span className="text-brand-1">decimos de frente</span>
          </h2>
          <p className="text-neutral-100">
            Chambeamos mejor con empresas en servicios profesionales, bienes raíces, construcción, industria y
            manufactura. <br/><br/>
            Que cuenten con equipo comercial estructurado o con ganas de estructurarlo.<br/><br/>
            Si un cliente te representa menos de $10,000 MXN al año, probablemente te va a salir más caro tenernos como
            agencia.<br/><br/>
            Si tu empresa vende high ticket, y el problema real es que los leads no se
            convierten o que no estás generando suficientes...<br/><br/>
            estás en el lugar correcto.</p>
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

        {/*<div className="border border-white/10">*/}
        {/*  {FAQ.map((item, i) => (*/}
        {/*    <div key={i} className={`p-8 md:p-10 ${i < FAQ.length - 1 ? 'border-b border-white/10' : ''}`}>*/}
        {/*      <h4 className="font-display font-black text-white mb-4" style={{fontSize: '1rem'}}>*/}
        {/*        {item.pregunta}*/}
        {/*      </h4>*/}
        {/*      <p className="font-mono text-[#B0AEA6] leading-relaxed" style={{fontSize: '0.85rem'}}>*/}
        {/*        {item.respuesta}*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </section>

      <section className="reading-container">
        <p className="-ft-2 text-brand-1">Primer paso</p>
        <h2 className="text-neutral-100">
          Agenda una sesión para analizar tu proyecto
        </h2>
        <p className="text-neutral-100">Para garantizar que nuestros clientes cuenten con una estrategia óptima,
          solo
          seleccionamos los proyectos en los que podamos ayudar mejor.<br/><br/>
          Pero ya llegaste hasta acá…<br/><br/>
          Regálanos unos datos y agenda una cita para hacer un diagnóstico de tu proyecto.</p>
        <OptInForm/>
      </section>
    </div>
  );
}

function Divider() {
  return (
    <div className="max-w-[40ch] ft-2 mx-auto mt-40">
      <div className="border-t border-neutral-700"/>
    </div>
  );
}