import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

import Account from '@/components/Auth/Account';

export default function Header() {
  return (
    <div className='flex flex-row items-center justify-between w-full bg-white shadow py-2 px-2 sm:px-5 gap-2'>
      <div className='grow'>
        <Link href='/'>
          <h1 className='font-medium pb-0'>Decent Next.js Starter Template</h1>
        </Link>
      </div>
      <a
        href='https://github.com/jschuur/decent-nextjs-starter-template'
        rel='noreferrer noopener'
        target='_blank'
        tabIndex={-1}
        className='no-underline hover:no-underline'
      >
        <IconBrandGithub
          className='text-purple-600 hover:text-purple-700 size-6 sm:size-8'
          strokeWidth={1.5}
        />
      </a>
      <div className='h-10'>
        <Account />
      </div>
    </div>
  );
}
