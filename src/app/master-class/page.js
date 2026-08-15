import '@/styles/globals.scss';
import Image from 'next/image';

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// Recurring event: last Thursday of the current month, rolling to next month once it's passed.
function getNextMasterClassDate() {
  const getLastThursday = (year, month) => {
    const date = new Date(year, month + 1, 0);
    const diff = (date.getDay() + 3) % 7;
    date.setDate(date.getDate() - diff);
    return date;
  };

  const now = new Date();
  let target = getLastThursday(now.getFullYear(), now.getMonth());
  if (target < now) {
    target = getLastThursday(now.getFullYear(), now.getMonth() + 1);
  }
  return target;
}

const formatEventDate = (date) => `${date.getDate()} de ${MONTHS_ES[date.getMonth()]} de ${date.getFullYear()}`;
const formatBadgeDate = (date) => `${date.getDate()} de ${MONTHS_ES[date.getMonth()]}`;

export default function MasterClass() {
  const checkoutLink = `https://wa.me/+${info.whatsapp.value}`;
  const eventDate = getNextMasterClassDate();

  const whatYouGet = [
    {
      title: 'Comprobar si te están viendo la cara',
      text: 'Hoy juzgas a quien te maneja la pauta por qué tan seguido te habla y si los posts se ven distintos. Así se corren agencias buenas y se conservan agencias malas, y nunca te enteras de cuál fue cuál. Vas a salir con criterios que no dependen de la opinión de nadie, ni de la mía.',
    },
    {
      title: 'Subirle o bajarle a la pauta sin que sea una apuesta',
      text: 'La mayoría de los negocios de tu tamaño no se estanca porque la campaña se muera. Se estanca porque llega a un techo que nadie se atreve a romper a ciegas. Con el tablero puesto, subirle deja de ser apostar y se vuelve multiplicar.',
    },
    {
      title: 'Cachar en qué punto estás dejando dinero en la mesa',
      text: 'O te faltan leads, o los leads llegan y se te mueren adentro. Desde tu silla las dos cosas se ven idénticas: gente que no compra. Y cada una se arregla de forma completamente distinta. Vas a salir sabiendo cuál de las dos es la tuya.',
    },
  ];

  const howItWorks = [
    {
      time: '25 min',
      title: 'Los 5 indicadores, uno por uno.',
      text: 'De dónde sale cada uno y cómo se lee. Nada guardado para los que compren.',
    },
    {
      time: '15 min',
      title: 'Diagnóstico en vivo.',
      text: 'Abrimos la cuenta de uno o dos asistentes frente al grupo y la leemos en tiempo real. Sin ensayo. Puede ser la tuya si levantas la mano.',
    },
    {
      time: '10 min',
      title: 'Al final te hago una oferta.',
      text: 'De eso vivo y no me voy a hacer el interesante. No es obligatorio comprarlo y lo que aprendiste te lo llevas de todas formas.',
    },
  ];

  const notForYou = [
    'Buscas tips de contenido, redes o community management. Aquí no se habla de eso ni un minuto.',
    'No tienes pauta corriendo en Meta ni piensas tenerla. Todo se aplica sobre datos reales, no sobre teoría.',
    'Quieres una hora donde nadie te venda nada. Al final hay oferta y lo digo desde ahora.',
  ];

  const eventDetails = [
    {label: 'Fecha', value: formatEventDate(eventDate)},
    {label: 'Hora', value: '17:00 hrs (CDMX)'},
    {label: 'Dónde', value: 'Zoom, en vivo'},
    {label: 'Duración', value: '90 minutos'},
    {label: 'Inversión', value: '$800 MXN'},
  ];

  return (
    <div className="flex flex-col relative bg-neutral-950">
      <section className="container flex flex-col items-start pt-20 pb-20 md:pt-32 text-neutral-50">
        <div className="w-full md:w-1/2 mx-auto flex flex-col">
          <p className="-ft-2 uppercase mono w-max text-brand-1">
            Master Class en vivo · Zoom · {formatBadgeDate(eventDate)} · 17:00 hrs
          </p>
          <h1 className="ft-8 mt-8 text-neutral-50">Deja de adivinar por qué las agencias a veces funcionan y a veces
            no</h1>
          <p className="ft-2 mt-8 text-neutral-50">
            90 minutos en vivo.<br/>
            Aprende los 5 indicadores para juzgar tu inversión en publicidad.<br/>
            Juzgar a tu agencia actual.<br/>
            Juzgarnos a nosotros.
          </p>
          <div className="w-full text-center mt-12 text-neutral-50">
            <a href={checkoutLink} className="button-block">Apartar mi lugar</a>
            <p className="sans ft-4 mt-4 text-neutral-50">$800 MXN</p>
            <p className="-ft-1 mt-2 text-neutral-50">Pago único. Cupo limitado. No se graba.</p>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <div className="md:w-1/2 mb-12">
          <p className="overhead text-brand-1">Aprenderás</p>
          <h2 className="mt-8 text-neutral-50">Tres cosas que hoy no puedes hacer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatYouGet.map((item) => (
            <div key={item.title} className="border border-neutral-500 p-12">
              <h3 className="mb-8 text-neutral-50">{item.title}</h3>
              <p className="text-neutral-50">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <div className="md:w-1/2 mb-12">
          <p className="overhead text-brand-1">Cómo funciona la Master Class</p>
          <h2 className="mt-8 text-neutral-50">Sin misterios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {howItWorks.map((step) => (
            <div key={step.time} className="p-12 bg-black flex flex-col">
              <p className="mono ft-4 text-brand-1">{step.time}</p>
              <h3 className="text-neutral-50 mt-4 mb-4">{step.title}</h3>
              <p className="text-neutral-50">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <div className="w-full md:w-1/2 mb-12">
          <p className="overhead text-brand-1">Quién la imparte</p>
          <h2 className="mt-8 text-neutral-50">A quién vas a aguantar 90 min?</h2>
        </div>
        <div className="md:w-1/2 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full border-y py-16">
            <div
              className="relative w-full aspect-square overflow-hidden flex items-center justify-center bg-black">
              <Image src="/images/fer-portrait.png" alt="Fernando Mendez" layout="fill"/>
            </div>
            <div className="flex flex-col justify-end">
              <p className="sans ft-2 text-neutral-50">Fernando Méndez</p>
              <p className="-ft-1 uppercase tracking-wide mt-2 text-neutral-50 mb-auto">Fundador y director<br/>Notoriovs
                Studio</p>
              <p className="mt-8 text-neutral-50">
                8 años construyendo sistemas de adquisición y cierre para PyMEs en México.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 w-full mt-12">
            <div>
              <p className="ft-6 sans text-brand-1">8</p>
              <p className="-ft-1 text-neutral-50">años operando</p>
            </div>
            <div>
              <p className="ft-6 sans text-brand-1">120+</p>
              <p className="-ft-1 text-neutral-50">clientes</p>
            </div>
            <div>
              <p className="ft-6 sans text-brand-1">200+</p>
              <p className="-ft-1 text-neutral-50">negocios consultados</p>
            </div>
          </div>
          <p className="mt-12 text-neutral-50">
            Un vato como tú que decidió emprender que se la pasa revisando cuentas publicitarias todos los días y
            ve el mismo patrón repetirse: negocios sanos atorados por no saber leer sus propios números, y
            proveedores buenos corridos por razones que nadie pudo comprobar.
          </p>
          <p className="mt-8 text-neutral-50">
            Y sí, tiene una agencia. Lo que te va a enseñar aquí sirve para juzgarlo a él exactamente igual que a
            cualquier otro. Está consciente y aun así la da.
          </p>
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <div className="w-full md:w-1/2 mb-12">
          <p className="overhead text-brand-1">Antes de pagar</p>
          <h2 className="text-neutral-50">Esto no es para ti si:</h2>
        </div>
        <div className="md:w-1/2 w-full">
          <ul>
            {notForYou.map((text) => (
              <li key={text} className="ft-1 mb-4 before:content-['⛌'] before:text-red-700 before:-left-8 before:absolute ml-8 relative text-neutral-50">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container flex flex-col items-center mb-20 border-t py-20">
        <p className="overhead text-brand-1">Los datos</p>
        <div className="md:w-1/2 w-full border border-neutral-500 divide-y divide-neutral-500 mt-8">
          {eventDetails.map((row) => (
            <div key={row.label} className="flex justify-between p-6 text-neutral-50">
              <span className="sans -ft-1 uppercase tracking-wide">{row.label}</span>
              <span className="ft-1 text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t py-20 bg-black">
        <div className="reading-container !border-0 !mt-0 flex flex-col items-center text-center">
          <p className="overhead text-brand-1">Último paso</p>
          <h2 className="text-white">$800 para que dejes de preguntarte por qué no crece tu bisne</h2>
          <p className="text-white">
            Apartas tu lugar, te llega el acceso de Zoom y llegas con tu cuenta de anuncios abierta. Eso es todo
            lo que tienes que hacer.
          </p>
        </div>
        <div className="reading-container !border-0 !mt-0">
          <a href={checkoutLink} className="button-block">Apartar mi lugar por $800</a>
        </div>
      </div>
    </div>
  );
}