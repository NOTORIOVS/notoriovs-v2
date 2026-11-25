// Cita con formato de mensaje de WhatsApp (modo oscuro), igual que en la landing principal.

// Colores de nombre como en los chats grupales de WhatsApp (modo oscuro)
const WA_NAME_COLORS = ['#53bdeb', '#fc9775', '#a5b337', '#e26ab6', '#06cf9c', '#ffd279'];

// Hash simple y determinista (evita diferencias entre SSR y cliente)
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function Quote({quote, className = ''}) {
  const h = hashString(quote.author + quote.text);
  const nameColor = WA_NAME_COLORS[hashString(quote.author) % WA_NAME_COLORS.length];
  const time = `${9 + (h % 10)}:${String(h % 60).padStart(2, '0')}`;
  const initial = quote.author.charAt(0);

  return (
    <figure className={`flex items-start gap-4 w-full !m-0 ${className}`}>
      <div
        aria-hidden="true"
        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-[#111b21] -ft-1 sans"
        style={{backgroundColor: nameColor}}
      >
        {initial}
      </div>
      <div className="relative max-w-full drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.35)]">
        {/* Colita de la burbuja */}
        <svg
          aria-hidden="true"
          viewBox="0 0 8 13"
          className="absolute -top-1 -left-4 w-4 h-[20px]"
        >
          <path d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" fill="#202c33"/>
        </svg>
        <blockquote className="relative bg-[#202c33] rounded-lg rounded-tl-none px-8 py-8 !m-0 sans">
          <figcaption className="-ft-2 flex flex-wrap items-baseline gap-x-2 mb-1">
            <span className="font-bold" style={{color: nameColor}}>{quote.author}</span>
            <span className="-ft-3 text-[#8696a0]">~ {quote.role}</span>
          </figcaption>
          <p className="text-[#e9edef] !mb-0 leading-snug">
            {quote.text}
            {/* Espaciador para que la hora no se encime con el texto */}
            <span aria-hidden="true" className="inline-block w-14"/>
          </p>
          <span className="absolute right-3 bottom-1.5 -ft-3 text-[#8696a0] leading-none">{time}</span>
        </blockquote>
      </div>
    </figure>
  );
}

