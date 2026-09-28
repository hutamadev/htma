'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className='col-start-5 col-end-10 flex h-screen w-full flex-col items-center justify-center gap-y-6 lg:col-start-7'>
      <h2 className={clsx('text-center text-lg text-error', 'md:text-2xl')}>
        Something went wrong!
      </h2>
      <button
        className={clsx(
          'mx-auto w-fit rounded-full bg-on-surface px-8 py-2 text-primary-container',
          'disabled:cursor-not-allowed disabled:bg-on-surface/[0.12] disabled:text-on-surface/[0.38]',
          'dark:enabled:bg-primary dark:enabled:text-surface'
        )}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
