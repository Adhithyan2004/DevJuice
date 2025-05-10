// app/layout.tsx (NO "use client" here)
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ✅ Metadata is now allowed
export const metadata = {
  title: 'DevJuice',
  description: 'A platform for frontend developers to share and discover tools',
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
