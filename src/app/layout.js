import '@/styles/globals.scss';
import TrackingAnalytics from '@/components/trackingAnalytics';

export const metadata = {
  title: 'Notoriovs Studio // Brand and Marketing Consultancy',
  description: 'Young creative blood to help your business become a successful brand',
};

export default function RootLayout({children}) {

  return (
    <html lang="en">
    <head>
      <TrackingAnalytics />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="/typetura.js" type="text/javascript" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      <title>{metadata.title}</title>
    </head>
    <body>
      {children}
    </body>
    </html>
  );
}
