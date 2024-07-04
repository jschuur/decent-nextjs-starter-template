import CTAs from '@/components/Template/CTAs';
import Features from '@/components/Template/Features';
import HeroHeader from '@/components/Template/HeroHeader';
import Intro from '@/components/Template/Intro';

export default function Home() {
  return (
    <>
      <HeroHeader className='py-12 sm:py-20' />
      <Intro />
      <CTAs className='pb-14 pt-12' />
      <Features className='py-2' />
    </>
  );
}
