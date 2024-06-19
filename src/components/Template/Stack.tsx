'use client';

import { IconPlus } from '@tabler/icons-react';
import { sortBy } from 'lodash';
import { useSession } from 'next-auth/react';
import { useHotkeys } from 'react-hotkeys-hook';

import ErrorCallout from '@/components/Site/ErrorCallout';
// import Loading from '@/components/Site/Loading';
import NoticeCallout from '@/components/Site/NoticeCallout';
import StackItem from '@/components/Template/StackItem';
import StackItemDialog from '@/components/Template/StackItemDialog';

import { Button } from '@/components/ui/button';

import useDialog from '@/hooks/useDialog';
import useStackItems from '@/hooks/useStackItems';

import { canEditStackItems } from '@/auth/roles';
import { getErrorMessage } from '@/lib/utils';

export default function Stack() {
  const { data: session } = useSession();
  const stackAdmin = canEditStackItems(session?.user);

  // will initially use prefetched data that was  bundled at build time, but also
  // immediately performs a new fetch and updates the UI with the latest data from DB
  const { data: stackItems = [], error } = useStackItems();
  const { open: addStackItem } = useDialog('stackItem');

  useHotkeys('a', () => addStackItem(), { enabled: stackAdmin, preventDefault: true });

  // if you're not using prefetched/dehydrated data, you might want to show a loading spinner
  // if (isLoading) return <Loading />;

  if (error)
    return <ErrorCallout title='Error loading stack items'>{getErrorMessage(error)}</ErrorCallout>;

  const sortedStackItems = sortBy(stackItems, 'position');

  return (
    <div className='pb-4'>
      <div className='flex items-center justify-between pb-2'>
        <h2 className='pb-0'>Stack</h2>
        {stackAdmin && (
          <Button variant='outline' onClick={() => addStackItem()}>
            <IconPlus className='mr-2 size-4' />
            Add Stack Item
          </Button>
        )}
      </div>
      {sortedStackItems.length > 0 ? (
        <div className='grid auto-rows-fr grid-cols-1 gap-4 pt-2 md:grid-cols-2 lg:grid-cols-3'>
          {sortedStackItems.map((item) => (
            <StackItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <NoticeCallout title='Stack data missing'>
          <p>
            Run <code className='font-bold'>(p)npm run db:seed</code> to seed the database (
            <a href='https://github.com/jschuur/decent-nextjs-starter-template?tab=readme-ov-file#usage'>
              more setup details
            </a>
            ).
          </p>
        </NoticeCallout>
      )}
      <StackItemDialog />
    </div>
  );
}
