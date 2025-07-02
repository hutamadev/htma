import clsx from 'clsx';
import { GiBrain } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer className='w-full py-6'>
      <div
        className={clsx(
          'flex items-center justify-end gap-x-1 whitespace-nowrap text-xs text-custom-black',
          'md:text-base',
          'dark:text-custom-green'
        )}
      >
        <p>© Created with</p>
        <GiBrain className={clsx('text-xl text-red-400', 'md:text-2xl')} />
        <p>by htma,</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
