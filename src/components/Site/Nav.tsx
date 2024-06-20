import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className='flex w-full items-center justify-between gap-2'>
      <div>
        <Link href='/'>
          <h1 className='pb-0 font-medium'>Decent Next.js Starter Template</h1>
        </Link>
      </div>
      <div>
        <a
          href='https://github.com/jschuur/decent-nextjs-starter-template'
          rel='noreferrer noopener'
          target='_blank'
          className='no-underline hover:no-underline'
        >
          <IconBrandGithub
            className='size-6 text-purple-600 hover:text-purple-700 sm:size-8'
            strokeWidth={1.5}
          />
        </a>
      </div>
    </nav>
  );
}
