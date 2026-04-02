import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import { logFlagSvgComments } from '@/lib/logFlagSvgComments';

export const metadata = {
  title: 'Aroma — Luxury Perfumes',
  description: 'Aroma — luxury perfume collection',
};

export const viewport = {
  themeColor: '#FFF9F2',
};

export default async function RootLayout({ children }) {
  if (process.env.NODE_ENV === 'development') {
    logFlagSvgComments();
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
