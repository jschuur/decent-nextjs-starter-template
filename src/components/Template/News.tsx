import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function News() {
  return (
    <Alert className='bg-orange-50'>
      <AlertTitle>Work in Progress</AlertTitle>
      <AlertDescription>
        <p>Coming soon: Nav menu and sample UI implementations with helpers.</p>
      </AlertDescription>
    </Alert>
  );
}
