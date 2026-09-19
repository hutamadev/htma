import clsx from 'clsx';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='col-start-3 col-end-12 flex min-h-[70vh] flex-col items-center justify-center gap-y-4 px-4 text-center lg:col-start-5'>
      <h1 className='text-display-md font-bold text-primary dark:text-primary'>
        404
      </h1>
      <h2 className='text-headline-sm font-semibold text-custom-black dark:text-custom-white-2'>
        Page Not Found
      </h2>
      <p className='max-w-md text-body-md text-on-surface-variant'>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href='/'
        className={clsx(
          'mt-4 rounded-xl bg-custom-black px-6 py-3 text-label-lg font-medium text-custom-green duration-300',
          'hover:bg-primary-container hover:text-on-primary-container',
          'dark:bg-custom-green dark:text-custom-black'
        )}
      >
        Back to Home
      </Link>
    </div>
  );
}
