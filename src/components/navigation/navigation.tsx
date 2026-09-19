'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { MdGraphicEq } from 'react-icons/md';

import LoadingSpin from '@components/ui/loading-spin';

import { useStore } from '@store/useStore';

import { neutral } from '@utils/localFont';

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const { isClient, clientHandler } = useStore((state) => ({
    isClient: state.isClient,
    clientHandler: state.clientHandler,
  }));

  useEffect(() => {
    clientHandler();
  }, [clientHandler]);

  const toggleThemeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className='fixed top-0 z-[1090] flex nav-height w-full items-center'>
      <nav className='layout flex justify-center'>
        <div className={clsx('grid-12 gap-1', 'md:gap-6')}>
          <div className='col-start-1 flex w-fit items-center rounded bg-custom-black px-2 py-1'>
            <Link
              href='/'
              className={clsx(
                neutral.className,
                'text-lg font-semibold whitespace-nowrap text-custom-green'
              )}
            >
              HTMA
            </Link>
          </div>
          <div className='col-start-12 mx-auto block'>
            {isClient ? (
              <button
                onClick={toggleThemeHandler}
                className={clsx(
                  'relative z-[60] mt-1 flex flex-col items-center text-custom-black',
                  'lg:text-custom-green',
                  'dark:text-custom-green dark:lg:text-custom-black'
                )}
              >
                <MdGraphicEq
                  className={clsx(
                    'text-3xl duration-500',
                    'lg:text-4xl',
                    `${theme === 'dark' ? 'rotate-180' : 'rotate-45'}`
                  )}
                />
                <span
                  className={clsx(
                    'absolute top-10 rotate-90 text-sm',
                    'md:text-base'
                  )}
                >
                  {theme === 'light' ? 'light' : 'dark'}
                </span>
              </button>
            ) : (
              <LoadingSpin className='h-8 w-8' />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
