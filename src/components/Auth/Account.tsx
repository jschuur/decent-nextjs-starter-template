import AccountMenu from '@/components/Auth/AccountMenu';
import Avatar from '@/components/Auth/Avatar';
import SignIn from '@/components/Auth/SignIn';

import { auth } from '@/auth/auth';

export default async function Account() {
  const session = await auth();

  const user = session?.user;

  if (!user) return <SignIn provider='google' />;

  return (
    <AccountMenu user={user}>
      <Avatar user={user} />
    </AccountMenu>
  );
}
