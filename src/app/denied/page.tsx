import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function News() {
  return (
    <Alert variant='destructive' className='bg-red-50 '>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Access denied</AlertTitle>
      <AlertDescription>
        <p className='text-destructive'>User not authorised to access page</p>
      </AlertDescription>
    </Alert>
  );
}
