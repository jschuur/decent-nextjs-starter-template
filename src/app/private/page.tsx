import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const session = await auth();

  if (!session) return redirect('/denied');

  return (
    <div>
      <h1>Private Page</h1>
      <p>Only logged in users can see this page</p>
    </div>
  );
}
