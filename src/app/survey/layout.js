import '@/styles/globals.scss';
import Header from '@/components/header';

export default function RootLayout({children}) {

  return (
    <>
      <Header/>
      <main className="flex-grow">{children}</main>
    </>
  );
}
