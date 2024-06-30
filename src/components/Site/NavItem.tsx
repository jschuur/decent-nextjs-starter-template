'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  path: string;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
};

export default function NavItem({ path, icon: Icon, children, disabled, className }: Props) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'text-nowrap decoration-2 underline-offset-[6px] sm:underline-offset-8',
        pathname === path ? 'underline decoration-red-600' : 'decoration-black hover:underline',
        disabled && 'pointer-events-none cursor-not-allowed',
        className
      )}
    >
      {pathname === path ? (
        <div>
          {Icon && <Icon className='mb-1 mr-2 hidden size-4 md:inline-block lg:size-5' />}
          <span>{children}</span>
        </div>
      ) : (
        <Link href={path} prefetch={true}>
          {Icon && (
            <Icon className='mb-1 mr-2 hidden size-4 cursor-pointer md:inline-block lg:size-5' />
          )}
          <span className='cursor-pointer'>{children}</span>
        </Link>
      )}
    </div>
  );
}
