export default function HeroHeader() {
  return (
    <h1 className='bg-gradient-to-r from-cyan-400 to-blue-700 bg-clip-text py-8 text-center font-sans text-5xl font-black leading-snug text-transparent md:text-[5rem] md:leading-tight'>
      A Decent{' '}
      <span className='underline decoration-amber-400 decoration-8 underline-offset-[12px]'>
        Next.js
      </span>
      <br />{' '}
      <span className='underline decoration-amber-400 decoration-8 underline-offset-[12px]'>
        Starter
      </span>{' '}
      Template
    </h1>
  );
}
