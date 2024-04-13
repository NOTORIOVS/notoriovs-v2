import '@/styles/globals.scss';

export const metadata = {
  title: 'Notoriovs Studio // Brand and Marketing Consultancy',
  description: 'Young creative blood to help your business become a successful brand',
};

export default function ReceiptLayout({children}) {

  return (
    <body className='w-full max-w-[1080px] mx-auto'>
      <main className='w-full'>{children}</main>
    </body>
  );
}
