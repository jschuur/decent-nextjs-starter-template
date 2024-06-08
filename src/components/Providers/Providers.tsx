'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <>
      <Toaster richColors position='bottom-center' />
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
}
