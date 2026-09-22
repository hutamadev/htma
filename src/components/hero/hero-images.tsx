import clsx from 'clsx';
import { motion } from 'framer-motion';

import LoadingSkeleton from '@components/ui/loading-skeleton';
import Chubbs1SVG from '@components/ui/svg/Chubbs1SVG';
import Chubbs2SVG from '@components/ui/svg/Chubbs2SVG';

import { useStore } from '@store/useStore';

import { m3Motion } from '@utils/motion';

export default function HeroImages() {
  const isClient = useStore((state) => state.isClient);

  return (
    <section
      className={clsx(
        'relative hidden',
        'lg:mb-4 lg:flex lg:w-full lg:items-center lg:justify-evenly'
      )}
    >
      {isClient ? (
        <>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...m3Motion.spatial.slow, delay: 0.8 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <Chubbs2SVG
              className={clsx(
                'w-20 text-on-surface',
                'dark:text-primary',
                '2xl:w-24'
              )}
              fill='currentColor'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...m3Motion.spatial.slow, delay: 1.0 }}
            exit={{ opacity: 0, x: 24 }}
          >
            <Chubbs1SVG
              className={clsx(
                'w-20 text-on-surface',
                'dark:text-primary',
                '2xl:w-24'
              )}
              fill='currentColor'
            />
          </motion.div>
        </>
      ) : (
        <LoadingSkeleton className={clsx('h-36 w-full')} />
      )}
    </section>
  );
}
