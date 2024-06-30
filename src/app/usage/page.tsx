export default function UsagePage() {
  return (
    <div className='py-4'>
      <div className='flex items-center justify-center py-2'>
        <h1 className='text-center'>Get Started With Decent Template</h1>
      </div>
      <h2>Setup</h2>
      <p>
        Clone <a href='https://github.com/jschuur/decent-nextjs-starter-template'>GitHub repo</a>.
        Run (p)npm install. Check{' '}
        <a href='https://github.com/jschuur/decent-nextjs-starter-template?tab=readme-ov-file#usage'>
          README
        </a>{' '}
        for more instructions. Start building.
      </p>
      <h2>What&apos;s Next?</h2>
      <p>
        Report{' '}
        <a href='https://github.com/jschuur/decent-nextjs-starter-template/issues' target='_blank'>
          issues
        </a>{' '}
        or contribute via GitHub.
      </p>
    </div>
  );
}
