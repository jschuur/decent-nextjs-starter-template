import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';

import KPIList from '@/components/Admin/KPIList';
import StackTable from '@/components/Admin/StackTable';
import NoticeCallout from '@/components/Site/NoticeCallout';

import { isAdmin } from '@/auth/roles';

export default async function AdminPage() {
  const session = await auth();
  const userIsAdmin = isAdmin(session?.user);

  if (!session) return redirect('/denied');

  return (
    <div className='py-4'>
      {!userIsAdmin && (
        <NoticeCallout title='Read only access'>
          As a non-admin user you only have limited access to this page.
        </NoticeCallout>
      )}
      <KPIList className='py-2 pb-4' />
      <StackTable />
    </div>
  );
}
