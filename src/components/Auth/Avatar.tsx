import { IconUser } from '@tabler/icons-react';
import { User } from 'next-auth';

import { AvatarFallback, AvatarImage, Avatar as AvatarRoot } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

type Props = {
  user: User;
  className?: string;
};

export default function Avatar({ user, className }: Props) {
  const initials = user?.name
    ? user?.name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .slice(0, 3)
        .join('')
    : '';

  return (
    <AvatarRoot className={cn('size-8', className)}>
      <AvatarImage
        className={cn('pointer-events-none select-none')}
        src={user.image || undefined}
      />
      <AvatarFallback className='text-sm text-black sm:text-base'>
        {initials || <IconUser className='size-4 sm:size-5' />}
      </AvatarFallback>
    </AvatarRoot>
  );
}
