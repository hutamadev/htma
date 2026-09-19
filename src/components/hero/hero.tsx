'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import { useStore } from '@store/useStore';

import useBaffle from '@hooks/useBaffle';

import HeroImages from './hero-images';
import HeroSocials from './hero-socials';
import HeroTitle from './hero-title';

export default function Hero() {
  const { newBaffle } = useBaffle('.nameBaffle');

  const clientHandler = useStore((state) => state.clientHandler);

  useEffect(() => {
    clientHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      newBaffle();
    }, 2700);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={clsx(
        'sticky top-0 z-[1080] col-start-1 col-end-3 flex h-screen flex-col items-center',
        'lg:col-start-2 lg:col-end-5'
      )}
    >
      <div
        className={clsx(
          'flex h-full flex-col-reverse justify-between pt-52 pb-24',
          'md:pt-52 md:pb-36',
          'lg:flex-col lg:justify-center lg:gap-y-4 lg:pt-20 lg:pb-0',
          '2xl:gap-y-6'
        )}
      >
        <HeroTitle />
        <HeroImages />
        <HeroSocials />
      </div>
    </section>
  );
}
