'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function HeroHeader({ className }: Props) {
  // via https://variantvault.chrisabdo.dev/text-variants
  const slideVariants = {
    hidden: { opacity: 0, x: '-50vw' },
    visible: { opacity: 1, x: 0 },
    right: { opacity: 0, x: '50vw' },
  };
  const transitionDuration = 0.6;

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.h1
        initial='hidden'
        animate='visible'
        variants={slideVariants}
        transition={{ duration: transitionDuration }}
        className='bg-gradient-to-br from-cyan-400 to-blue-700 bg-clip-text text-center font-sans text-5xl font-black leading-snug text-transparent md:text-[5rem] md:leading-tight'
      >
        A Decent{' '}
        <span className='underline decoration-amber-400 decoration-8 underline-offset-[12px]'>
          Next.js
        </span>
      </motion.h1>

      <motion.h1
        initial='right'
        animate='visible'
        variants={slideVariants}
        transition={{ duration: transitionDuration }}
        className='bg-gradient-to-br from-cyan-400 to-blue-700 bg-clip-text text-center font-sans text-5xl font-black leading-snug text-transparent md:text-[5rem] md:leading-tight'
      >
        <span className='underline decoration-amber-400 decoration-8 underline-offset-[12px]'>
          Starter
        </span>{' '}
        Template
      </motion.h1>
    </div>
  );
}
