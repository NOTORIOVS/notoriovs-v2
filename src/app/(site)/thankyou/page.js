import Image from 'next/image';
import logo from '../../../../public/images/svg/NTRS-Logo-Green.png';

export default function Thankyou() {
  return (
    <div className="flex flex-col relative">
      <div className="fixed flex items-center h-screen w-full z-[-1]"/>
      <section className="relative justify-center items-center z-[1] top-[5rem] pt-[4rem] pb-[10rem]">
        <div className="flex flex-col items-center">
          <div className="hidden md:flex items-center w-full h-48 mb-20 relative">
            <Image
              src={logo}
              fill={true}
              style={{objectFit: 'contain'}}
              alt="Notoriovs Studio"
            />
          </div>
          <h2 className="ft-6 text-center">
            ¡Vientos! ya estamos del otro lado.
          </h2>
          <p className="mb-12 text-center">Selecciona una día y hora para platicar</p>
          <div className="w-full flex justify-center">
            <iframe src="https://notoriovsstudio.pipedrive.com/scheduler/bEE1rxHv/consultoria-gratuita"
                    title="Pipedrive Scheduler Embed" frameBorder="0" height="1000px" width="100%"
                    style={{maxWidth: '800px'}} allowFullScreen></iframe>
          </div>
          <div className="">
            <p className="ft-3 text-center mono mt-20">Si no se abrió nuestro calendario para agendar tu sesión
              gratuita
              <a
                className="text-brand-3"
                href="https://notoriovsstudio.pipedrive.com/scheduler/bEE1rxHv/consultoria-gratuita"
                target="_blank"
              >
                <nobr><span className="material-icons">arrow_forward</span>da click aquí<span
                  className="material-icons">arrow_back</span></nobr>
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}