import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function News() {
  return (
    <Alert className='bg-orange-50'>
      <AlertTitle>Work in Progress</AlertTitle>
      <AlertDescription>
        <p>
          Coming soon: Auth.js, TanStack Query with hydration, nav menu, Sentry/Google Analytics and
          misc UI helper hooks.
        </p>
      </AlertDescription>
    </Alert>
  );
}
