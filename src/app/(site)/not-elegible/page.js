'use client';
import Image from 'next/image';
import logo from '../../../../public/images/svg/NTRS-Logo-Green.png';
import cover from '../../../../public/images/NTRS-StarterMarketing-Thumbnail.png';
import Faqs from '@/components/faqs';
import { useEffect } from 'react';
import fbEvent from '@/services/fbEvents';
import { getCookie } from 'cookies-next';

export default function NotElegible() {
  const msg = encodeURI('Hola! Podemos programar una llamada para que me ayuden con el marketing de mi negocio?')
  const waLink = `https://wa.me/+523317628442?text=${msg}`;

  useEffect(() => {
    const leadCookie = getCookie('lead');
    const lead = JSON.parse(leadCookie || '{}');
    return () => fbEvent('Not Elegible', {phone: lead?.phone, email: lead?.email, externalID: lead?.id});
  }, []);

  return (
    <div className="flex flex-col relative pt-[5rem]">
      <section className="reading-container mb-20 !border-0 !mt-0 relative z-[1]">
        <h2 className="flex flex-col ft-8">
          <span>Todavía no eres perfil para Notoriovs.</span>
          <span className="text-brand-1">Pero te tenemos una solución.</span>
        </h2>
        <p>
          <span className="ft-2">No es por gachos pero te estaríamos robando.</span><br/><br/>
          Nuestro modelo opera con empresas que ya tienen estructura comercial y presupuesto para un sistema
          completo.<br/><br/>
          En este momento, lo que nos compartiste encaja mejor con algo diferente y tenemos exactamente eso para ti.
        </p>
      </section>
      <div className="relative pb-20">
        <div className="absolute inset-0 z-[9999] bg-[rgba(0,0,0,0)] backdrop-invert pointer-events-none"/>
        <div className="reading-container !border-0 !mt-0">
          <p className="sans ft-6">Te presentamos: 3Cuartos AG</p>
          <p>Nuestro brother, Pier Bravo, fue COO de Notoriovs.<br/><br/>
            Aprendió el modelo de captación de nuevos clientes desde adentro y decidió crear su propia agencia orientada
            a un perfil como el tuyo.<br/><br/>
            No es un competidor.<br/><br/>
            Es parte del mismo ecosistema.</p>
          <div className="w-full text-center">
            <a href={waLink} target="_blank" className="button !w-full invert">Programa una llamada!</a>
            <p className="-ft-1 mt-4">Sin compromiso. Sin pitch agresivo. 20 minutos.</p>
          </div>
        </div>
      </div>
      <section className="reading-container flex flex-col items-center mb-20 border-t py-20">
        <h2 className="mb-12">Una agencia con mejor fit para ti</h2>
        <p className="mb-8">
          Trabaja con negocios en etapa de crecimiento temprano que necesitan:<br/>
          — Presencia digital<br/>
          — Captación básica<br/>
          — Campañas que funcionen sin un equipo de ventas detrás.<br/><br/>
          Misma mentalidad de resultados, escala diferente.
        </p>
        <div className="w-full text-center">
          <a href={waLink} target="_blank" className="button !w-full">Programa una llamada!</a>
          <p className="-ft-1 mt-4">Sin compromiso. Sin pitch agresivo. 20 minutos.</p>
        </div>

      </section>
      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <h2 className="mb-12">Que encuentras en 3Cuartos AG?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="p-16 bg-black">
            <p className="text-white sans ft-2">Generación de Leads</p>
            <p className="text-white">Básico pero bien hecho:<br/>
              Campañas de prospección digital para que empieces a generar oportunidades de negocio.
            </p>
          </div>
          <div className="p-16 bg-black">
            <p className="text-white sans ft-2">Presencia Digital</p>
            <p className="text-white">Presencia sin complicarnos la vida:<br/>
              Campañas de prospección, contenido y gestión de redes.
            </p>
          </div>
        </div>

        <div className="reading-container !border-0 !mt-0">
          <a href={waLink} target="_blank" className="button !w-full">Programa una llamada!</a>
          <p className="-ft-1 text-center">Sin compromiso. Sin pitch agresivo. 20 minutos.</p>
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
            <p className="-ft-1 mt-8 flex-grow">Tenía miedo de otra vez tirar mi dinero a la basura. Pero me supieron
              guiar y ahora todos los WhatsApps que llegan tienen sentido.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Elena M.</p>
            <p className="-ft-2 mt-2">Emprendedora de productos artesanales</p>
          </div>
          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.fac6f4d6.png&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Después de vivir de puros referidos ya tengo leads que preguntan por mis
              planes de ahorro diario.</p>
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
              me dio claridad y me hizo avanzar.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Marcela T.</p>
            <p className="-ft-2 mt-2">Diseñadora freelance</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F07.a47c5323.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Con otras agencias solo me publicaban en insta y face pero ni un alma me
              mandaba mensaje para comprar. Con 3Cuartos si se vio la diferencia.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Daniela V.</p>
            <p className="-ft-2 mt-2">Marca de joyería artesanal</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F02.966b6c46.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Pensé que sería como todas las agencias que te hacen tu parrilla de
              contenido pero si jaló y ahi vamos con algunos nuevos clientes.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Héctor R.</p>
            <p className="-ft-2 mt-2">Entrenador personal</p>
          </div>

          <div className="w-full p-12 flex flex-col border border-black">
            <div className="relative w-[10rem] h-[10rem] rounded-full border-4 border-black overflow-hidden">
              <img
                src="https://www.lcvaliados.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F09.cafedd78.jpeg&w=3840&q=75"
                alt=""/>
            </div>
            <p className="-ft-1 mt-8 flex-grow">Empezamos un viernes y el siguiente viernes ya había logrado mi primer
              venta.</p>
            <p className="-ft-2 py-2 px-4 bg-black text-white mt-8 border-t-4 border-brand-1">Lorena S.</p>
            <p className="-ft-2 mt-2">Consultora para emprendedores</p>
          </div>
        </div>

        <div className="reading-container !border-0 !mt-0">
          <a href={waLink} target="_blank" className="button !w-full">Programa una llamada!</a>
          <p className="-ft-1 text-center">Sin compromiso. Sin pitch agresivo. 20 minutos.</p>
        </div>
      </section>

      <div className="border-t py-20 bg-black">
        <div className="reading-container !border-0 !mt-0 flex flex-col items-center">
          <h2 className="text-white">No necesitas un sistema complejo para empezar a vender. Solo
            necesitas un buen guía que te muestre el camino.</h2>
          <p className="text-white">Agenda una llamada gratuita con Pier. Ya tiene un brief de lo que
            encontramos en tu quiz para que no empieces desde cero.</p>
        </div>
        <div className="reading-container !border-0 !mt-0">
          <a href={waLink} target="_blank" className="button !w-full">Programa una llamada!</a>
          <p className="-ft-1 text-center text-neutral-300">Sin compromiso. Sin pitch agresivo. 20 minutos.</p>
        </div>
      </div>

    </div>
  );
}