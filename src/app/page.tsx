import CTAs from '@/components/Template/CTAs';
import Features from '@/components/Template/Features';
import HeroHeader from '@/components/Template/HeroHeader';
import Intro from '@/components/Template/Intro';

export default function Home() {
  return (
    <>
      <HeroHeader />
      <Intro />
      <CTAs className='py-10' />
      <Features className='py-2' />
    </>
  );
}
