import '@/styles/globals.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Notoriovs Studio // Brand and Marketing Consultancy',
  description: 'Young creative blood to help your business become a successful brand',
};

export default function RootLayout({children}) {

  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}
