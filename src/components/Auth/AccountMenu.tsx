import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  children: ReactNode;
  user: User;
};

export default function AccountMenu({ children, user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='border-none data-[state=open]:border-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} align='end'>
        <DropdownMenuLabel className='flex flex-col'>
          <div>{user.name}</div>
          <div className='text-[7pt] text-slate-500 font-normal'>{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href='/public'>Public Page</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/private'>Private Page</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
