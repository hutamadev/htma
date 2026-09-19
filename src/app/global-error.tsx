'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col items-center justify-center bg-[#fdfcfa] p-4 font-sans text-[#1b1c17] dark:bg-[#1b1c17] dark:text-[#e4e3da]'>
        <div className='flex max-w-md flex-col items-center gap-y-4 text-center'>
          <h2 className='text-2xl font-bold'>Something went wrong!</h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            A critical error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => reset()}
            className={clsx(
              'rounded-xl bg-[#1b1c17] px-6 py-2.5 text-sm font-medium text-[#d0ef67]',
              'hover:opacity-90 dark:bg-[#b4d34e] dark:text-[#1b1c17]'
            )}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
