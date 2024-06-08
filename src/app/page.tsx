import { Button } from '@/components/ui/button';
import { IconBrandGithub } from '@tabler/icons-react';

import Stack from '@/components/Stack';

export default function Home() {
  return (
    <>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='text-xl sm:text-2xl'>Decent Next.js Starter Template</div>
        <Button size={'sm'} variant='default' className='bg-purple-600 hover:bg-purple-700'>
          <IconBrandGithub className='mr-2' size={20} />
          <a
            href='https://github.com/jschuur/decent-nextjs-starter-template'
            rel='noreferrer noopener'
            target='_blank'
          >
            <span className='hidden sm:inline-block'>GitHub Repo</span>
          </a>
        </Button>
      </div>
      <Stack />
    </>
  );
}
