'use client';
import Image from 'next/image';
import logo from '../../../../public/images/svg/NTRS-Logo-Green.png';
import cover from '../../../../public/images/NTRS-StarterMarketing-Thumbnail.png';
import Faqs from '@/components/faqs';
import { useEffect } from 'react';
import fbEvent from '@/services/fbEvents';
import { getCookie } from 'cookies-next';

export default function NotElegible() {
  const pmtLink = 'https://pay.hotmart.com/R99467572K';
  const faqs = [
    {
      q: '¿Este manual sirve si no sé nada de marketing?',
      a: 'Sí. Fue hecho para emprendedores sin experiencia previa. Empieza desde lo esencial.',
    },
    {
      q: '¿Necesito invertir en anuncios para aplicar lo que dice?',
      a: 'No. Muchos ejercicios son estratégicos y puedes implementarlos de forma orgánica.',
    },
    {
      q: '¿Qué pasa si no entiendo algo del manual?',
      a: 'Incluye ejemplos, plantillas y explicaciones claras. Además, puedes escribirnos si tienes dudas.',
    },
    {
      q: '¿Puedo aplicar esto aunque mi negocio sea físico o local?',
      a: 'Sí. Hay apartados específicos para negocios locales y cómo atraer clientes digitales.',
    },
    {
      q: '¿Cuánto tiempo me tomará aplicarlo?',
      a: 'Puedes completar todo en menos de una semana y comenzar a implementar desde el primer día.',
    },
  ];

  useEffect(() => {
    const leadCookie = getCookie('lead');
    const lead = JSON.parse(leadCookie || "{}");
    return () => fbEvent('Not Elegible', {phone: lead?.phone, email: lead?.email, externalID: lead?.id});
  }, []);

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        <div className="absolute inset-0 z-[9999] bg-[rgba(0,0,0,0)] backdrop-invert pointer-events-none"/>
        <div className="absolute flex items-center h-screen w-full overflow-hidden z-[-1] invert">
          <Image
            src="/images/backgrounds/bkg-manual.jpg"
            fill={true}
            style={{objectFit: 'cover'}}
            alt="Proyecto marketing"/>
        </div>
        <section className="relative min-h-screen justify-center items-center z-[1] invert">
          <div className="md:w-1/2">
            <h2 className="ft-11 text-center text-white">
              Starter Marketing
            </h2>
            <p className="sans ft-5 text-center text-white mt-12">Tu negocio todavía no necesita una agencia. Necesita estrategia que funcione desde hoy.</p>
            <p className="text-center text-white mt-20">Descubre el manual práctico con nuestra metodología para generar tus primeros prospectos sin depender de expertos ni gastar miles en campañas sin sentido</p>
          </div>
          <div
            className="w-full flex flex-col justify-center bottom-40 md:bottom-20 mt-auto mb-0 cursor-pointer absolute"
          >
            <span className="text-center text-gray-300">Para abajo</span>
            <span className="material-icons text-white mx-auto animate-bounce">expand_more</span>
          </div>
        </section>
      </div>
      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <div className="md:w-1/2">
          <h2 className="mb-12">Para qué sirve esta madre?</h2>
          <p className="ft-2 mb-8">Ok, con este manual vas a poder:</p>
          <ul>
            <li className="ft-2 mb-4">Diagnosticar tu negocio como un profesional, sin tecnicismos ni paja.</li>
            <li className="ft-2 mb-4">Estructurar una estrategia simple pero efectiva para atraer prospectos en redes.
            </li>
            <li className="ft-2 mb-4">Evitar errores comunes que te hacen perder tiempo y dinero.</li>
            <li className="ft-2 mb-4">Crear mensajes que conectan con clientes reales, no con likes vacíos.</li>
            <li className="ft-2 mb-4">Avanzar sin ayuda externa y demuestra que sí puedes vender con tus propios
              medios.
            </li>
          </ul>
          <div className="w-full ft-4 text-center mt-12">
            <a href={pmtLink} target="_blank" className="button-block">Ya dale clic!</a>
            <p className="-ft-1 mt-4">Comienza a obtener oportunidades de negocio por $800</p>
          </div>
        </div>
      </section>
      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <h2 className="mb-12">Por qué está chido este manual?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <p className="p-12 bg-black text-white text-center">100% práctico: sin teoría innecesaria ni relleno</p>
          <p className="p-12 bg-black text-white text-center">Aplicable desde el día 1: no necesitas herramientas
            costosas</p>
          <p className="p-12 bg-black text-white text-center">Incluye ejercicios guiados para que apliques cada módulo
            al instante</p>
          <p className="p-12 bg-black text-white text-center">Enfocado en resultados: pensado para que generes
            prospectos, no solo aprendas</p>
          <p className="p-12 bg-black text-white text-center">Compatible con cualquier tipo de negocio: productos
            físicos, servicios, coaching, etc.</p>
          <p className="p-12 bg-black text-white text-center">Pensado para que traigas a la IA como tu el chalán que
            siempre soñaste</p>
        </div>

        <div className="w-full md:w-1/2 ft-4 text-center mt-12">
          <a href={pmtLink} target="_blank" className="button-block">Ya dale clic!</a>
          <p className="-ft-1 mt-4">Comienza a obtener oportunidades de negocio por $800</p>
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <h2 className="mb-12">Ahí te van unos comentarios chidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F06.591ff87c.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Tenía miedo de seguir probando cosas sin sentido. Este manual fue como
              tener un
              mentor explicándome paso a paso. En menos de una semana armé mi primera campaña.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Elena M.</p>
            <p className="-ft-2 mt-2">Emprendedora de productos artesanales</p>
          </div>
          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.fac6f4d6.png&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Con cero experiencia estructuré una estrategia real. Ya tengo leads que
              preguntan
              por mis planes de ahorro.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Luis C.</p>
            <p className="-ft-2 mt-2">Asesor financiero independiente</p>
          </div>
          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F08.d395ce75.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">No pensé que algo tan simple pudiera tener tanto impacto. Me dio foco,
              me dio
              claridad y me hizo avanzar.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Marcela T.</p>
            <p className="-ft-2 mt-2">Diseñadora freelance</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F07.a47c5323.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Antes sentía que hacía marketing a ciegas. Con el manual, entendí cómo
              aterrizar mi mensaje y detectar lo que estaba fallando. Por fin tengo claridad.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Daniela V.</p>
            <p className="-ft-2 mt-2">Marca de joyería artesanal</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F02.966b6c46.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Pensé que sería como otros ebooks llenos de teoría, pero este manual va
              directo al grano. Me hizo pensar como estratega, no solo como vendedor improvisado.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Héctor R.</p>
            <p className="-ft-2 mt-2">Entrenador personal</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F09.cafedd78.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Lo descargué un sábado y el lunes ya estaba aplicando los ejercicios. Me
              di cuenta de errores que llevaba meses cometiendo sin saberlo.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Lorena S.</p>
            <p className="-ft-2 mt-2">Consultora para emprendedores</p>
          </div>


        </div>

        <div className="w-full md:w-1/2 ft-4 text-center mt-12">
          <a href={pmtLink} target="_blank" className="button-block">Ya dale clic!</a>
          <p className="-ft-1 mt-4">Comienza a obtener oportunidades de negocio por $800</p>
        </div>
      </section>

      <div className="relative py-32">
        <div className="absolute inset-0 z-[9999] bg-[rgba(0,0,0,0)] backdrop-invert pointer-events-none"/>
        <div className="reading-container border border-brand-1 invert">
          <div className="p-16">
            <h2 className="text-white mb-20">Pero como vienes de nuestra campaña principal</h2>
            <p className="text-white mb-20">Te damos chance tener este manual con un descuento para que ya pongas en
              orden
              tu prospección y empieces a vender.</p>
            <div className="p-12 mb-20 border border-brand-1">
              <p className="text-red-500 text-center">No vas a pagar $1,499</p>
              <p className="sans text-center text-white">Solo:</p>
              <h3 className="text-white text-center ft-11">$800</h3>
            </div>
            <a href={pmtLink} target="_blank" className="button-block hover:!border-brand-1">Descarga el manual</a>
            <p className="text-white text-center -ft-1 mt-4">Comienza a obtener oportunidades de negocio por $800</p>
          </div>
        </div>
      </div>

      <section className="container flex flex-col items-center my-20 border-t py-20">
        <div className="md:w-1/2">
          <h2>Todo lo que necesitas saber sobre el manual Starter Marketing ya está aquí:</h2>
          <div className="w-full">
            <Faqs questions={faqs}/>
          </div>
        </div>
        <div className="w-full md:w-1/2 ft-4 text-center">
          <a href={pmtLink} target="_blank" className="button-block">Ya dale clic!</a>
          <p className="-ft-1 mt-4">Comienza a obtener oportunidades de negocio por $800</p>
        </div>
      </section>

      <div className="border-t py-20 bg-black">
        <div className="container flex flex-col items-center mb-20">
          <div className="md:w-1/2">
            <h2 className="text-center text-white">No necesitas una agencia para empezar a vender. Solo necesitas una
              guía que te
              muestre el camino.</h2>
          </div>
          <div className="w-full md:w-1/2 ft-4 mt-20 text-center">
            <a href={pmtLink} target="_blank" className="button-block hover:!border-brand-1">Descarga el Manual
              Ahora</a>
            <p className="-ft-1 mt-4 text-white">Comienza a obtener oportunidades de negocio por $800</p>
          </div>
        </div>
      </div>

    </div>
  );
}