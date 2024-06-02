import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='text-xl'>Decent Next.js Starter Template</div>
      <Button variant='outline' className='mt-4'>
        <a
          href='https://github.com/jschuur/decent-nextjs-starter-template?tab=readme-ov-file'
          rel='noreferrer noopener'
          target='_blank'
        >
          More Info
        </a>
      </Button>
    </main>
  );
}
