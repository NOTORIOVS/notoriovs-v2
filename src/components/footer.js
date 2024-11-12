import { info } from '../../info';

export default function Footer() {
  return (
    <footer className="w-full py-20 border-t bg-black">
      <div className="container flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex">
          <p className="-ft-4 text-white">{info.address.address}<br/>
            {info.address.col}<br/>
            {info.address.city} — {info.address.country}
          </p>
          <div className="flex flex-col justify-between ml-auto md:ml-8">
            <p className="-ft-4 text-white">
              <span className="font-bold">E:</span>
              <a href={`mailto:${info.email.sender}`}>{info.email.sender}</a>
            </p>
            <p className="-ft-4 text-white">
              <span className="font-bold">T:</span>
              <a href={`tel:${info.whatsapp.value}`}>{info.whatsapp.value}</a>
            </p>
          </div>
        </div>
        <p className="-ft-4 pt-8 md:pt-0 text-white">{info.legalName}</p>
      </div>
    </footer>
  );
}