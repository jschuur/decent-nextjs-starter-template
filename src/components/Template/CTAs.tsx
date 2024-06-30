import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function CTAs({ className }: Props) {
  return (
    <div
      className={cn('flex w-full items-center justify-center gap-8 sm:gap-12 md:gap-20', className)}
    >
      <Link href='/usage'>
        <Button size='lg'>Get Started</Button>
      </Link>
      <Link href='/stack'>
        <Button size='lg' variant='outline'>
          See the Stack
        </Button>
      </Link>
    </div>
  );
}
