import Image from 'next/image';
import logo from '../../../public/images/svg/NTRS-Logo-Green.png';

export default function Thankyou() {
  return (
    <div className="flex flex-col relative h-screen">
      <div className="absolute flex items-center h-screen w-full z-[-1]">
        <Image
          src="/images/backgrounds/bkg-5.jpg"
          fill={true}
          className="object-cover invert"
          alt="Proyecto marketing"/>
      </div>
      <section className="relative flex-grow justify-center items-center z-[1] invert">
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="flex items-center w-full h-48 mb-20 relative">
            <Image
              src={logo}
              fill={true}
              style={{objectFit: 'contain'}}
              alt="Notoriovs Studio"
            />
          </div>
          <h2 className="ft-8 text-center text-white">
            Vientos! ya estamos del otro lado.
          </h2>
          <h3 className="text-center mono text-white mt-20">Si no se abrió nuestro calendario para agendar tu sesión gratuita</h3>
          <a
            className="button !bg-brand-2 ft-4 flex justify-center items-center !text-white mt-6"
            href="https://notoriovsstudio.pipedrive.com/scheduler/bEE1rxHv/consultoria-gratuita"
            target="_blank"
          >
            <span className="text-white material-icons">arrow_forward</span>Da click aquí<span className="text-white material-icons">arrow_back</span>
          </a>
        </div>
      </section>
    </div>
  )
}