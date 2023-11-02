import '@/styles/globals.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Notoriovs // Agencia de Marketing',
  description: 'Young creative blood to help your business become a successful brand',
};

export default function RootLayout({children}) {

  return (
    <html lang="en">
    <head>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="text/javascript" src="/typetura.js"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <title>Notoriovs Studio // Brand and Marketing Consultancy</title>
    </head>
    <body>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </body>
    </html>
  );
}
