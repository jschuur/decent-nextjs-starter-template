import Socials from '@/components/Site/Socials';

export default function Footer() {
  return (
    <footer className='flex flex-row items-center justify-between gap-2 w-full pt-6 pb-2 px-1'>
      <div className='grow text-slate-500 text-sm'>Crafted by Joost Schuur</div>
      <Socials />
    </footer>
  );
}
