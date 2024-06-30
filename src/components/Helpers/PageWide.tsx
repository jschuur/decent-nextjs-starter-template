import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: ReactNode;
};
export default function PageWide({ className, children }: Props) {
  return (
    <div className='relative'>
      <div className={cn('relative left-1/2 w-[100vw] -translate-x-1/2 transform', className)}>
        {children}
      </div>
    </div>
  );
}
