import {
  Blocks,
  Bolt,
  Building,
  LifeBuoy,
  Rocket,
  SquareMousePointer,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import PageWide from '@/components/Helpers/PageWide';

import { cn } from '@/lib/utils';

type FeatureProps = {
  Icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
};
function Feature({ children, Icon, title }: FeatureProps) {
  return (
    <div className='flex'>
      <Icon className='mt-1 size-8 flex-shrink-0' />
      <div className='ms-5 sm:ms-8'>
        <h3 className='text-base font-semibold sm:text-lg'>{title}</h3>
        <p className='mt-1 text-muted-foreground'>{children}</p>
      </div>
    </div>
  );
}
type Props = {
  className?: string;
};
export default function Features({ className }: Props) {
  return (
    <PageWide className='border-y border-slate-300 bg-white py-8'>
      <div className={cn('mx-auto max-w-5xl px-4', className)}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Feature Icon={Building} title='Built on widely adopted solutions'>
            Authentication, database, UI, form handling, state, data fetching,{' '}
            <Link className='underline hover:text-blue-500' href='/stack'>
              and more
            </Link>
            ...
          </Feature>
          <Feature Icon={SquareMousePointer} title='(Some) common UI patterns'>
            Sample implementations of modal dialog boxes, forms, tables etc, based on shadcn/ui.
          </Feature>
          <Feature Icon={Bolt} title='Sensible defaults pre-configured'>
            Start your project on a solid foundation.
          </Feature>
          <Feature Icon={LifeBuoy} title='Useful helpers'>
            A small selection of hooks, components, and utilities to help you build your app.
          </Feature>
          <Feature Icon={Blocks} title='Extensible by design'>
            Override styles and toggle features with ease.
          </Feature>
          <Feature Icon={Rocket} title='Deployment ready'>
            Ship to AWS via SST or just use Vercel.
          </Feature>
        </div>
      </div>
    </PageWide>
  );
}
