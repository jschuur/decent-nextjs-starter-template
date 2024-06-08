import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import Providers from '@/components/Providers/Providers';
import Footer from '@/components/Site/Footer';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Decent Next.js Starter Template',
  description: 'Quickly start a new Next.js project with common tools and configurations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-blue-50 font-sans antialiased', fontSans.variable)}>
        <Providers>
          <main className='container max-w-5xl mx-auto py-4'>
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
