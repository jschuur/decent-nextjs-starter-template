import { IconUser } from '@tabler/icons-react';

import { signIn } from '@/auth/auth';
import { Button } from '@/components/ui/button';

// via https://github.com/nextauthjs/next-auth-example/blob/main/components/auth-components.tsx
export default function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';

        await signIn(provider);
      }}
    >
      <Button size='sm' variant='default' className='bg-blue-100 text-black hover:bg-blue-200'>
        <IconUser className='mr-2 size-4 sm:size-5' />
        Signin
      </Button>
    </form>
  );
}
