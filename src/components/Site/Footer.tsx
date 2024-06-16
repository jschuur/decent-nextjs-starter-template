import Socials from '@/components/Site/Socials';

export default function Footer() {
  return (
    <footer className='container flex w-full max-w-5xl flex-row items-center justify-between gap-2 py-6'>
      <div className='grow text-sm text-slate-700'>Crafted by Joost Schuur</div>
      <Socials />
    </footer>
  );
}
