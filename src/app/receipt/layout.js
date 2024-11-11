import '@/styles/globals.scss';

export default function ReceiptLayout({children}) {

  return (
    <body className='w-full bg-black'>
      <main className='w-full max-w-[1080px] mx-auto'>{children}</main>
    </body>
  );
}
