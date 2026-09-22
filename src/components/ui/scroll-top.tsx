'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MdDoubleArrow } from 'react-icons/md';

import { useStore } from '@store/useStore';

const ScrollTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isClient, clientHandler } = useStore((state) => state);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    clientHandler();
  }, [clientHandler]);

  const scrollTopHandler = () => {
    if (isClient) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className={clsx(
        isClient && scrollPosition > window.innerHeight / 4
          ? ''
          : 'translate-y-[999px]',
        'fixed bottom-[5%] rounded-xl bg-primary-container p-2 text-on-primary-container duration-700',
        'hover:-translate-y-1 hover:shadow-md',
        'focus-visible:outline-2 focus-visible:outline-primary'
      )}
      onClick={scrollTopHandler}
      type='button'
      aria-label='Scroll back to top'
      data-no-magnetic
    >
      <MdDoubleArrow className='-rotate-90 text-2xl' />
    </button>
  );
};

export default ScrollTop;
