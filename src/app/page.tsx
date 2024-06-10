import Intro from '@/components/Template/Intro';
import News from '@/components/Template/News';
import Stack from '@/components/Template/Stack';
import Usage from '@/components/Template/Usage';

export default function Home() {
  return (
    <>
      <News />
      <Intro />
      <Usage />
      <Stack />
    </>
  );
}
