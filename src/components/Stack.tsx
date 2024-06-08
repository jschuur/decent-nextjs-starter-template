import { getStackItems } from '@/db/queries';

import StackItem from '@/components/StackItem';

export default async function Stack() {
  const stackItems = await getStackItems();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr pt-4'>
      {stackItems.map((item) => (
        <StackItem key={item.id} item={item} />
      ))}
    </div>
  );
}
