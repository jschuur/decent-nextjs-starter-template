import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from 'sonner';

import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import './globals.css';

import Providers from '@/components/Providers/Providers';
import ReactQueryProvider from '@/components/Providers/ReactQueryProvider';
import Footer from '@/components/Site/Footer';
import GoogleAnalytics from '@/components/Site/GoogleAnalytics';
import Header from '@/components/Site/Header';

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
      <body
        className={cn(
          'min-h-screen bg-blue-50 font-sans antialiased flex flex-col',
          fontSans.variable
        )}
      >
        <Providers>
          <ReactQueryProvider>
            <Header />
            <main className='container max-w-5xl py-4 px-4 sm:px-8 grow'>{children}</main>
            <Footer />

            <Toaster richColors position='bottom-center' />
          </ReactQueryProvider>
        </Providers>

        <GoogleAnalytics />
      </body>
    </html>
  );
}
