import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};
export default function NoticeCallout({ children, className, title = 'Error' }: Props) {
  return (
    <Alert variant='default' className='bg-amber-50'>
      <TriangleAlert className='h-4 w-4' />
      <AlertTitle className='pb-2'>{title}</AlertTitle>
      <AlertDescription>
        <div className={className}>{children}</div>
      </AlertDescription>
    </Alert>
  );
}
