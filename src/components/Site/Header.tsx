import { IconBrandGithub } from '@tabler/icons-react';

export default function Header() {
  return (
    <div className='flex flex-row items-center justify-between w-full bg-white shadow py-2 px-2 sm:px-5'>
      <h1 className='font-medium pb-0'>Decent Next.js Starter Template</h1>
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
    </div>
  );
}
