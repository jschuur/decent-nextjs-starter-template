'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

import Logo from '@/components/Site/Logo';
import NavItem from '@/components/Site/NavItem';

export default function Nav() {
  const { data: session } = useSession();
  const signedIn = session?.user;

  return (
    <nav className='flex w-full flex-row items-center gap-2'>
      <div className='flex grow items-center gap-2 font-header text-base font-medium sm:gap-3 md:gap-4 md:text-xl'>
        <NavItem path={'/'}>
          <Logo>Home</Logo>
        </NavItem>
        <NavItem path={'/stack'}>Stack</NavItem>
        <NavItem path={'/usage'}>Usage</NavItem>
        <NavItem path={'/resources'}>Resources</NavItem>
        {signedIn && <NavItem path={'/admin'}>Admin</NavItem>}
      </div>

      <div>
        <a
          href='https://github.com/jschuur/decent-nextjs-starter-template'
          rel='noreferrer noopener'
          target='_blank'
          className='no-underline hover:no-underline'
        >
          <IconBrandGithub
            className='size-6 text-purple-600 transition ease-in-out hover:scale-125 hover:text-purple-700 sm:size-8'
            strokeWidth={1.5}
          />
        </a>
      </div>
    </nav>
  );
}
