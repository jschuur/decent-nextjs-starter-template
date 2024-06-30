'use client';

import { sortBy } from 'lodash';

import ErrorCallout from '@/components/Site/ErrorCallout';
// import Loading from '@/components/Site/Loading';
import NoticeCallout from '@/components/Site/NoticeCallout';
import StackItem from '@/components/Template/StackItem';

import useStackItems from '@/hooks/useStackItems';

import { getErrorMessage } from '@/lib/utils';

export default function Stack() {
  // will initially use prefetched data that was  bundled at build time, but also
  // immediately performs a new fetch and updates the UI with the latest data from DB
  const { data: stackItems = [], error } = useStackItems();

  // if you're not using prefetched/dehydrated data, you might want to show a loading spinner
  // if (isLoading) return <Loading />;

  if (error)
    return <ErrorCallout title='Error loading stack items'>{getErrorMessage(error)}</ErrorCallout>;

  const sortedStackItems = sortBy(stackItems, 'position');

  return (
    <div className='py-4'>
      <div className='flex items-center justify-center py-2'>
        <h1 className='text-center'>Decent Template Stack</h1>
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
    </div>
  );
}
