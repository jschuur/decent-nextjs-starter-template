import { signOut } from '@/auth/auth';
import { Button } from '@/components/ui/button';

// via https://github.com/nextauthjs/next-auth-example/blob/main/components/auth-components.tsx
export default function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';

        await signOut();
      }}
      className='w-full text-left'
    >
      <Button
        size='sm'
        variant='ghost'
        className='h-[1lh] w-full justify-start p-0 text-left font-semibold'
        {...props}
      >
        Signout
      </Button>
    </form>
  );
}
