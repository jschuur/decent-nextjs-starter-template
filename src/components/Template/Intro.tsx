'use client';

import { useSession } from 'next-auth/react';

export default function Intro() {
  const { data: session } = useSession();
  const name = session?.user?.name?.split(' ')[0];

  return (
    <div className='py-4'>
      <h1>{name && `${name},`} Skip the Setup, Focus on your Idea</h1>
      <p className=''>
        An okay collection of libraries and helpers to speed up starting a new Next.js project and
        implementing common requirements.
      </p>
      <p>Don&apos;t waste time on boilerplate. The more you build, the better you get.</p>
    </div>
  );
}
