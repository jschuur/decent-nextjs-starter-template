import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import './globals.css';

import Providers from '@/components/Providers/Providers';
import Footer from '@/components/Site/Footer';
import GoogleAnalytics from '@/components/Site/GoogleAnalytics';
import Header from '@/components/Site/Header';

import { auth } from '@/auth';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Decent Next.js Starter Template',
  description: 'Quickly start a new Next.js project with common tools and configurations.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-blue-50 font-sans antialiased flex flex-col',
          fontSans.variable
        )}
      >
        <Providers session={session}>
          <Header />
          <main className='container max-w-5xl py-4 px-4 sm:px-8 grow'>{children}</main>
          <Footer />
        </Providers>

        <GoogleAnalytics />
      </body>
    </html>
  );
}
