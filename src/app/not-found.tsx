import clsx from 'clsx';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='col-start-3 col-end-12 flex min-h-[70vh] flex-col items-center justify-center gap-y-4 px-4 text-center lg:col-start-5'>
      <h1 className='text-display-md font-bold text-primary'>404</h1>
      <h2 className='text-headline-sm font-semibold text-on-surface'>
        Page Not Found
      </h2>
      <p className='max-w-md text-body-md text-on-surface-variant md:text-body-lg'>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href='/'
        className={clsx(
          'mt-4 rounded-full bg-on-surface px-6 py-3 text-label-lg font-medium text-primary-container duration-300',
          'hover:bg-primary-container hover:text-on-primary-container',
          'dark:bg-primary dark:text-surface'
        )}
      >
        Back to Home
      </Link>
    </div>
  );
}
