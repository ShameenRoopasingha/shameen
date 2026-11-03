import type { Metadata, Viewport } from 'next';
import { Chakra_Petch, Share_Tech_Mono, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

const chakraPetch = Chakra_Petch({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-tva-display',
  display: 'swap',
});

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-tva-tech',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-tva-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TVA TemPad OS v4.02 // SHAMEEN ROOPASINGHA',
  description:
    'Time Variance Authority TemPad Terminal: Shameen Roopasingha - Full Stack Engineer & Creative UI Architect.',
  keywords: [
    'Shameen Roopasingha',
    'Full Stack Developer',
    'TVA TemPad',
    'React',
    'Next.js',
    'TypeScript',
    'Three.js',
    'WebGL',
  ],
  authors: [{ name: 'Shameen Roopasingha' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#120B05',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-[#120B05] ${chakraPetch.variable} ${shareTechMono.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-[#120B05] text-[#FF8C24] crt-grid-bg selection:bg-[#FF8C24] selection:text-[#120B05]"
        suppressHydrationWarning
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
