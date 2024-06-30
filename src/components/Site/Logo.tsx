'use client';

import { IconMoodEmpty, IconMoodSmile } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children?: ReactNode;
};
export default function Logo({ className, children }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative size-10'>
        <IconMoodSmile
          strokeWidth={1.5}
          className={cn(
            'absolute inset-0 size-10 text-black transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
        <IconMoodEmpty
          strokeWidth={1.5}
          className={cn(
            'absolute inset-0 size-10 text-black transition-opacity duration-500',
            isHovered ? 'opacity-0' : 'opacity-100'
          )}
        />
      </div>
      <span className='hidden sm:block'>{children}</span>
    </div>
  );
}
