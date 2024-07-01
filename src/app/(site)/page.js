'use client';

import Image from 'next/image';
import OptInForm from '@/components/opt-in-form';
import logo from '../../../public/images/svg/NTRS-Logo-Green.png';
import Link from 'next/link';
import scrollDepth from '@/utils/scrollDepth';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', 'Scroll', {depth: value}),
    })
  })

  return (
    <div className="pb-20">
      <div className="relative">
        <div className="absolute inset-0 z-[9999] bg-[rgba(0,0,0,0)] backdrop-invert pointer-events-none"/>
        <div className="absolute flex items-center h-screen w-full overflow-hidden z-[-1] invert">
          <Image
            src="/images/backgrounds/bkg-5.jpg"
            fill={true}
            style={{objectFit: 'cover'}}
            alt="Proyecto marketing"/>
        </div>
        <section className="relative min-h-screen justify-center items-center z-[1] invert">
          <div>
            <div className="lg:flex hidden items-center w-full h-48 mb-20 relative">
              <Image
                src={logo}
                fill={true}
                style={{objectFit: 'contain'}}
                alt="Notoriovs Studio"
              />
            </div>
            <h2 className="ft-10 text-center text-white">
              ¿Agencia de marketing?
              <br/>— Sí, pero más chido
            </h2>
            <h3 className="text-center text-white mt-20">Abajo te contamos rápidamente qué hacemos</h3>
          </div>
          <div
            className="w-full flex flex-col justify-center bottom-40 md:bottom-20 mt-auto mb-0 cursor-pointer absolute"
          >
            <span className="text-center text-gray-300">Para abajo</span>
            <span className="material-icons text-white mx-auto animate-bounce">expand_more</span>
          </div>
        </section>
      </div>
      <section className="flex flex-col min-h-screen justify-center items-center">
        <div className="max-w-[80ch] mt-20 space-y-8">
          <h2>Conectamos ideas que no tienen conexión</h2>
          <p>Entre mercadólogos, copywriters y diseñadores obsesivos,</p>
          <p>buscamos apoyarte con la carga del marketing,</p>
          <p>para que tú y tu equipo tengan más tiempo para las cosas que les salen bien,</p>
          <p>las cosas que son buenas para el negocio.</p>
          <p>En fin, cosas que importan más que tomar un curso de marketing digital</p>
          <p>y tal vez,</p>
          <p>fallar en el intento.</p>
          <div className="flex flex-col mt-20">
            <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">contáctanos, sin miedo, Click!</Link>
            <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
          </div>
        </div>
        <div className="max-w-[80ch] space-y-8">
          <h2 className="mt-20">Lo tuyo es armar un negocio, lo nuestro: ayudarte a crecer</h2>
          <p>Mira.</p>
          <p>Tenemos más de 5 años trabajando en esto del branding y el marketing
            digital.</p>
          <p>Éramos un mercadológo y un diseñador con ideas medias raras y</p>
          <p>hoy somos un colectivo de mercadólogos, diseñadores, copywriters,
            editores y otros talentos</p>
          <p>que te ayudan a solucionar una que otra cosilla:</p>
        </div>
        <div className="mt-20 relative w-full">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <p className="flex items-center justify-center bg-black p-12 text-white text-center">Estrategia de
              marketing</p>
            <p className="flex items-center justify-center bg-black p-12 text-white text-center">Identidad
              visual</p>
            <p className="flex items-center justify-center bg-black p-12 text-white text-center">Producción de
              contenido</p>
            <p className="flex items-center justify-center bg-black p-12 text-white text-center">Community
              management</p>
          </div>
        </div>
        <div className="max-w-[80ch] flex flex-col mt-20">
          <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">Seguro buscabas algo de esto, Click!</Link>
          <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
        </div>

        <div className="max-w-[80ch] space-y-8">
          <h2 className=" mt-20">Permítame tantito, le venimos ofreciendo…</h2>
          <p>Te voy a ser honesto,</p>
          <p>aquí no chambeamos de mes en mes,<br/>
            nosotros trabajamos por proyecto.</p>
          <p>Y es que…</p>
          <p>te voy a hacer una pregunta:</p>
          <p>tú construirías tu casa así sin planos, ni un render, ni nada?</p>
          <p>No lo creo.</p>
          <p>Por esto…</p>
          <p>primero tenemos que armar una estrategia, así como contratas a un arqui para que diseñe tu casa,
            saque planos y esas cosas;</p>
          <p>y es que, de nada te va a servir oootra campaña de WhatsApp si no se tiene claro el camino para llegar a
            tus objetivos.</p>
          <p>En pocas palabras, si no tienes esto:</p>
        </div>
        <div className="mt-12 relative w-full h-[10rem] lg:h-auto">
          <div
            className="flex lg:flex-wrap lg:w-full absolute lg:relative px-10 -right-8 -left-8 lg:ml-16 overflow-scroll snap-mandatory snap-x justify-start lg:justify-center">
            <p className="snap-center arrow_box mb-4">Diagnóstico de tu estado actual</p>
            <p className="snap-center arrow_box mb-4">Objetivos</p>
            <p className="snap-center arrow_box mb-4">Análisis de tu cliente</p>
            <p className="snap-center arrow_box mb-4">Análisis de la competencia</p>
            <p className="snap-center arrow_box mb-4">Una oferta sólida</p>
            <p className="snap-center arrow_box mb-4">Acciones de prospección</p>
          </div>
        </div>
        <div className="flex flex-col mt-20 max-w-[80ch]">
          <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">Tiene más sentido, ¿no? Click!</Link>
          <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
        </div>

        <div className="max-w-[80ch] space-y-8">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h2 className="mt-20">"Yo no necesito una estrategia, yo necesito que se pongan a chambear"</h2>
          <p>Dirías tú.</p>
          <p>Pero si estás leyendo esto probablemente es porque ya le has intentado por la libre y no te ha
            funcionado.</p>
          <p>O seguramente ya contrataste a algunos freelancers o agencias que te cobraban $5,000 al mes y
            terminaste sin una venta porque no supieron ni supiste identificar tu problema.</p>
          <p>Ojo, nosotros no vendemos, el que vende eres tú.</p>
          <p>Lo que sí, es que con nuestro programa te la vamos a poner más fácil.</p>
          <p>¿Y qué trae este programa?</p>
          <p>Básicamente es un «llave en mano» para que comiences a generar oportunidades de negocio.</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-20">
          <div className="border border-black p-8 pt-12">
            <h3 className="text-center">Estrategia y análisis</h3>
            <p className="text-center mt-8">
              Esto consiste en lo que te platiqué antes, hacer un análisis y aterrizar bien el camino por el que le vamos a llegar a tus clientes.
            </p>
          </div>
          <div className="border border-black p-8 pt-12">
            <h3 className="text-center">Ecosistema <br/>digital</h3>
            <p className="text-center mt-8">
              Aquí creamos tu landing page y la conectamos con una base de datos, el Pixel de FB y otras cositas más técnicas que ya platicaremos.
            </p>
          </div>
          <div className="border border-black p-8 pt-12">
            <h3 className="text-center">Campaña de prospección</h3>
            <p className="text-center mt-8">
              Esto sí es manitas a la obra, echamos a andar tu campaña para que se empiece a materializar todo ese choro que armamos como plan.
            </p>
          </div>
        </div>
        <div className="max-w-[80ch] flex flex-col mt-20">
          <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">¿Quieres conocer todo el proceso? Click!</Link>
          <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
        </div>

        <div className="max-w-[80ch] space-y-8">
          <h2 className="mt-20">Nosotros sí nos involucramos en tu <i>bisne</i></h2>
          <p>Te vamos a cuestionar,<br/>
            vamos a meter nuestra cuchara<br/>
            y hasta nos vas a decir que nosotros que vamos a andar sabiendo.</p>
          <p>Es más...<br/>
            Citando a un director comercial que nos pendejeó en un pitch:</p>
          <p className="border p-8 italic">«Son unos soberbios, nunca han vendido una casa, yo he tomado
            capacitaciones
            de marketing en grandes
            empresas. Su modelo no sirve y no les doy mi voto de confianza.»</p>
          <p>Después retacamos el inbox de la empresa con leads bien perros.</p>
          <p>Y citando a don patrón de la misma empresa:</p>
          <p className="border p-8 italic">«No sé que están haciendo pero todas las citas que he tenido han sido con
            gente muy bien perfilada
            ¡síganle!»</p>
          <p>En fin…</p>
          <p>nos hemos topado que casi siempre los empresarios y directores son expertos en lo que venden pero no
            tienen
            idea de por qué la gente les compra.</p>
          <p><i>Sad but true.</i></p>
          <p>Por eso somos chismosos, si no ¿cómo podríamos armar una estrategia exitosa?</p>
        </div>
        <div className="max-w-[80ch] flex flex-col mt-20">
          <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">¿Listo pa chambear juntos? Click!</Link>
          <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
        </div>

        <div className="space-y-8 max-w-[80ch]">
          <h2 className="mt-20">“Ajá, pero a ver, ¿qué han hecho?”</h2>
          <p>Y si eso estas pensando.</p>
          <p>Estos son unos cuantos proyectos.</p>
          <p>Los que nos dieron chance de cacarear.</p>
          <p>En ellos hemos aumentado audiencias</p>
          <p>o incrementado significativamente la cantidad de prospectos para negocios B2B en nichos
            específicos.</p>
        </div>
        <div className="flex flex-col my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-black">
            <div className="w-full pt-[100%] min-h-max relative">
              <Image
                src="/images/landings/faster.png"
                fill={true}
                alt="Faster Bajío"
                style={{objectFit: 'cover'}}
              />
            </div>
            <div className="p-8 my-auto">
              <h3>Faster</h3>
              <div>
                <p className="-ft-2 text-brand-1">Branding // Estrategia</p>
              </div>
              <p className="-ft-1">Los financieros dedicados a ofrecer créditos empresariales llegaron en ceros y al
                cabo de 6 meses terminaron rankeados como
                la
                franquicia #9
                de SOC Asesores a nivel nacional.</p>
              <div className="mt-8">
                <p className="-ft-3" style={{fontWeight: 'bold'}}>Resultados:</p>
                <h4 className="mb-0">812 Website Leads</h4>
                <p className="-ft-2 mb-8">Costo por lead: $54 MXN</p>
                <p className="-ft-4">Resultados de estrategia de 6 meses</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-black">
            <div className="w-full pt-[100%] relative">
              <Image
                src="/images/landings/CCU.png"
                fill={true}
                style={{objectFit: 'cover'}}
                alt="marketing y branding"
              />
            </div>
            <div className="md:order-first p-8 my-auto">
              <h3>Compra Casas USA</h3>
              <div>
                <p className="-ft-2 text-brand-1">Estrategia</p>
              </div>
              <p className="-ft-1">La inmobiliaria que ayudamos a transformar en una consultora en inversiones
                inmobiliarias, dejando atrás el típico enfoque de producto que todas las inmobiliarias utilizan.</p>
              <div className="mt-8">
                <p className="-ft-3" style={{fontWeight: 'bold'}}>Resultados:</p>
                <h4 className="mb-0">487 Leads</h4>
                <p className="-ft-2 mb-8">Costo por lead: $230 MXN</p>
                <p className="-ft-4">Resultados de estrategia de 6 meses</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border border-black">
            <div className="w-full pt-[100%] relative">
              <Image
                src="/images/landings/2g.png"
                fill={true}
                style={{objectFit: 'cover'}}
                alt="marketing y branding"
              />
            </div>
            <div className="p-8 my-auto">
              <h3>2G Iluminación</h3>
              <div>
                <p className="-ft-2 text-brand-1">Branding // Estrategia</p>
              </div>
              <p className="-ft-1">2G llegó con un estilo y mensaje poco definidos pero con ganas de
                posicionarse como iluminación más allá de los espacios para revolucionar los hogares y negocios.</p>
              <div className="mt-8">
                <p className="-ft-3" style={{fontWeight: 'bold'}}>Resultados:</p>
                <h4 className="mb-0">+1.2K followers*</h4>
                <p className="-ft-2 mb-8">Más de 9.5k reacciones</p>
                <p className="-ft-4">Estrategia de 3 meses.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[80ch] flex flex-col mt-20">
          <Link href={{href: '/', hash: 'contact'}} className="button !w-full text-center">¿No quisieras ver tu marca ahí arriba?
            Click!</Link>
          <p className="-ft-3 mt-4 text-center">Agenda una sesión gratuita para analizar tu proyecto</p>
        </div>
        <div
          id="contact"
          className="max-w-[80ch] flex flex-col space-y-8"
        >
          <h2 className="mt-20">Estás a nada de evolucionar tu marca</h2>
          <p className="text-left">Para garantizar que nuestros clientes cuenten con una estrategia óptima,
            solo
            seleccionamos los proyectos en los que podamos ayudar mejor.</p>
          <p className="text-left">Pero ya llegaste hasta acá…</p>
          <p className="text-left">Regálanos unos datos y agenda una cita para analizar tu proyecto.</p>
          <OptInForm/>
        </div>
      </section>
    </div>
  );
}

