import { IconBrandGithub, IconBrandThreads, IconBrandTwitter } from '@tabler/icons-react';

export default function Socials() {
  return (
    <>
      <a href='https://threads.net/@joostschuur' title='Threads (Joost Schuur)' target='_blank'>
        <IconBrandThreads className='size-5 text-black transition ease-in-out hover:scale-125' />
      </a>
      <a href='https://twitter.com/joostschuur' title='Twitter (Joost Schuur)' target='_blank'>
        <IconBrandTwitter className='size-5 text-blue-400 transition ease-in-out hover:scale-125' />
      </a>
      <a
        href='https://github.com/jschuur/decent-nextjs-starter-template'
        title='GitHub'
        target='_blank'
      >
        <IconBrandGithub className='size-5 text-purple-700 transition ease-in-out hover:scale-125' />
      </a>
    </>
  );
}
