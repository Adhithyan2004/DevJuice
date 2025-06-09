// app/layout.tsx (NO "use client" here)
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// in layout.tsx or Head.tsx
export const metadata = {
  title: 'DevJuice -  Dev Tools Hub',
  description:
    'A no-login toolbox for developers. Free, fast, and open source tools for color, UI, and more.',
  keywords:
    'developer tools, webdev, frontend tools, color palette, css generator, open source tools,react libraries, contribution',
  openGraph: {
    title: 'DevJuice – Free Developer Tools',
    description: 'Open source tools for frontend devs. Fast. No login. Just results.',
    url: 'https://dev-juice.vercel.app',
    siteName: 'DevJuice',
    images: [
      {
        url: 'https://dev-juice.vercel.app/og.png', // must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'DevJuice - Developer Tools Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DevJuice - Free Dev Tools',
    description: 'A fast, no-login toolbox for developers. Color tools, regex tester, meta viewer and more.',
    images: ['https://dev-juice.vercel.app/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          {children}
          <SpeedInsights />
        </ClientProviders>
      </body>
    </html>
  );
}
