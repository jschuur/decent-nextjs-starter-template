import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function HeroHeader({ className }: Props) {
  return (
    <h1
      className={cn(
        'text-balance bg-gradient-to-br from-cyan-400 to-blue-700 bg-clip-text text-center font-sans text-5xl font-black leading-snug text-transparent md:text-[5rem] md:leading-tight',
        className
      )}
    >
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
