'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

interface IPageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Readonly<IPageWrapperProps>) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <motion.section
      className={clsx(
        'z-[1000] col-start-3 col-end-12 h-full overflow-hidden overflow-y-visible px-4 will-change-transform',
        'md:px-0',
        'lg:col-start-5'
      )}
      initial={{ y: 24 }}
      animate={{ y: 0, transition: { duration: 0.7 } }}
      exit={{ y: 0 }}
    >
      {children}
    </motion.section>
  );
}
