'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
  session: Session | null;
};

export default function Providers({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <Toaster richColors position='bottom-center' />
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
}
