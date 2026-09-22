import { GiBrain } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer className='w-full py-6'>
      <div className='flex items-center justify-end gap-x-1 text-body-sm whitespace-nowrap text-on-surface-variant'>
        <p>© Created with</p>
        <GiBrain className='text-xl text-tertiary md:text-2xl' />
        <p>by htma,</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
