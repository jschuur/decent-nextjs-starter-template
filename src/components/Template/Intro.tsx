'use client';

import { useSession } from 'next-auth/react';

import Tooltip from '@/components/Helpers/Tooltip';

import { cn } from '@/lib/utils';

type Props = {
  className?: never;
};
export default function Intro({ className }: Props) {
  const { data: session } = useSession();
  const name = session?.user?.name?.split(' ')[0];

  return (
    <div className={cn(className)}>
      <h2>{name && `${name},`} Skip the Setup, Focus on your Idea!</h2>
      <p>
        An{' '}
        <Tooltip
          tooltip={`I'm honestly not (yet?) a great frontend developer 😄`}
          delayDuration={0}
        >
          <span className='pb-0 underline decoration-dotted underline-offset-[6px]'>okay</span>
        </Tooltip>{' '}
        collection of libraries, helpers and reference implementations to start up a new Next.js
        project quickly and help you implement common requirements.
      </p>
      <p>Don&apos;t waste time getting set up. The more you build, the better you get.</p>
      <p>A humble work in progress.</p>
    </div>
  );
}
