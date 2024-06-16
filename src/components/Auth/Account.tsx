'use client';

import { IconLoader2, IconUser } from '@tabler/icons-react';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useDebounceCallback, useIsClient } from 'usehooks-ts';

import { Button } from '@/components/ui/button';

import AccountMenu from '@/components/Auth/AccountMenu';
import Avatar from '@/components/Auth/Avatar';

export default function Account() {
  const { data: session, status } = useSession();
  const isClient = useIsClient();

  const user = session?.user;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const debouncedSetLoggingIn = useDebounceCallback(setIsLoggingIn, 500);

  if (!isClient) return null;

  const login = async () => {
    debouncedSetLoggingIn(true);
    await signIn('google');
    setIsLoggingIn(false);
  };

  return user ? (
    <AccountMenu user={user}>
      <Avatar user={user} />
    </AccountMenu>
  ) : (
    <Button
      size='sm'
      variant='default'
      onClick={login}
      className='bg-blue-100 text-black hover:bg-blue-200'
    >
      {status === 'loading' || isLoggingIn ? (
        <IconLoader2 className='mr-2 size-4 animate-spin sm:size-5' />
      ) : (
        <IconUser className='mr-2 size-4 sm:size-5' />
      )}
      Signin
    </Button>
  );
}
