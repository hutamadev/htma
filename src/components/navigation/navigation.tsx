'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import LoadingSpin from '@components/ui/loading-spin';

import { useStore } from '@store/useStore';

import { googleSansFlex } from '@utils/localFont';

export default function Navigation() {
  const { setTheme, resolvedTheme } = useTheme();
  const { isClient, clientHandler } = useStore((state) => ({
    isClient: state.isClient,
    clientHandler: state.clientHandler,
  }));

  useEffect(() => {
    clientHandler();
  }, [clientHandler]);

  const toggleThemeHandler = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className='pointer-events-none fixed top-0 z-[1090] flex nav-height w-full items-center bg-transparent'>
      <nav className='layout flex justify-center'>
        <div className={clsx('grid-12 gap-1', 'md:gap-6')}>
          <div className='pointer-events-auto col-start-1 flex w-fit items-center'>
            <Link
              href='/'
              className={clsx(
                googleSansFlex.className,
                'flex items-center rounded-xl bg-on-surface px-3 py-1.5 text-title-md font-semibold tracking-wide text-primary-container duration-200',
                'hover:bg-primary-container hover:text-on-primary-container',
                'dark:bg-primary dark:text-surface dark:hover:bg-primary-container dark:hover:text-on-primary-container'
              )}
            >
              HTMA
            </Link>
          </div>
          <div className='pointer-events-auto col-start-12 mx-auto flex items-center justify-center'>
            {isClient ? (
              <button
                onClick={toggleThemeHandler}
                aria-label={
                  resolvedTheme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
                className={clsx(
                  'relative z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface shadow-sm duration-300',
                  'hover:bg-surface-container-highest focus-visible:outline-2 focus-visible:outline-primary'
                )}
              >
                {resolvedTheme === 'dark' ? (
                  <MdLightMode className='text-2xl text-primary transition-transform duration-300 hover:rotate-90' />
                ) : (
                  <MdDarkMode className='text-2xl text-primary transition-transform duration-300 hover:-rotate-12' />
                )}
              </button>
            ) : (
              <LoadingSpin className='h-6 w-6' />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
