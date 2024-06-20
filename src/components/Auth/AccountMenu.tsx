import { User } from 'next-auth';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SignOut from '@/components/Auth/SignOut';

type Props = {
  children: ReactNode;
  user: User;
};
export default function AccountMenu({ children, user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          {children}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={8} alignOffset={-4}>
        <DropdownMenuLabel className='flex flex-col'>
          <div>{user.name}</div>
          <div className='text-[7pt] font-normal text-slate-500'>{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href='/public'>Public Page</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/private'>Private Page</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
