import '@/styles/globals.scss';
import '@/styles/render.scss';

export default function ReceiptLayout({children}) {

  return (
    <body className='w-full'>
    <main className='mx-auto'>{children}</main>
    </body>
  );
}
