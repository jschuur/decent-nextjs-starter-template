import Socials from '@/components/Site/Socials';

export default function Footer() {
  return (
    <footer className='container max-w-5xl flex flex-row items-center justify-between gap-2 w-full py-6'>
      <div className='grow text-slate-700 text-sm'>Crafted by Joost Schuur</div>
      <Socials />
    </footer>
  );
}
