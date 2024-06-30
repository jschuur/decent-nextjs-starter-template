import Account from '@/components/Auth/Account';
import Nav from '@/components/Site/Nav';

export default function Header() {
  return (
    <header className='sticky flex w-full items-center justify-between bg-neutral-50 shadow'>
      <div className='my-2 flex w-full items-center justify-between gap-2 px-4 sm:px-5'>
        <Nav />
        <Account />
      </div>
    </header>
  );
}
