import clsx from 'clsx';
import { motion } from 'framer-motion';

import LoadingSkeleton from '@components/ui/loading-skeleton';

import { useStore } from '@store/useStore';

import { googleSansFlex } from '@utils/localFont';
import { m3Motion } from '@utils/motion';

export default function HeroTitle() {
  const isClient = useStore((state) => state.isClient);

  return (
    <div
      className={clsx(
        !isClient && 'flex flex-col gap-y-2',
        'w-full -rotate-90',
        'lg:rotate-0'
      )}
    >
      {isClient ? (
        <motion.h1
          className={clsx(
            'text-xs font-normal text-on-surface',
            'md:text-sm',
            'dark:text-primary',
            'lg:text-title-md'
          )}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...m3Motion.spatial.default, delay: 0.2 }}
          exit={{ opacity: 0, x: -24 }}
        >
          hello, I'm
        </motion.h1>
      ) : (
        <LoadingSkeleton
          className={clsx('h-2 w-14', 'md:h-2.5 md:w-16', 'lg:h-4 lg:w-28')}
        />
      )}

      <div
        className={clsx(
          !isClient && 'lg:gap-y-2',
          'flex flex-row items-center gap-x-1',
          'lg:flex-col lg:items-start'
        )}
      >
        {isClient ? (
          <motion.h1
            className={clsx(
              googleSansFlex.className,
              'nameBaffle relative z-[1200] text-xl font-bold tracking-tight whitespace-nowrap text-on-surface',
              'dark:text-primary',
              'md:text-3xl',
              'lg:text-display-md lg:whitespace-normal',
              '2xl:text-display-lg'
            )}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...m3Motion.spatial.default, delay: 0.4 }}
            exit={{ opacity: 0, x: -24 }}
          >
            hutama
          </motion.h1>
        ) : (
          <LoadingSkeleton
            className={clsx('h-5 w-24', 'md:h-7 md:w-36', 'lg:h-12 lg:w-80')}
          />
        )}
      </div>

      {isClient ? (
        <motion.div
          className={clsx(
            'w-fit rounded-md bg-primary-container px-2 py-0.5 font-medium whitespace-nowrap text-on-primary-container',
            'text-label-sm',
            'md:rounded-md md:px-2.5 md:py-0.5 md:text-label-md',
            'lg:rounded-lg lg:px-3 lg:py-1 lg:text-label-lg lg:whitespace-normal'
          )}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...m3Motion.spatial.default, delay: 0.6 }}
          exit={{ opacity: 0, x: -24 }}
        >
          --web developer
        </motion.div>
      ) : (
        <LoadingSkeleton
          className={clsx('h-3.5 w-24', 'md:h-4 md:w-32', 'lg:h-6 lg:w-48')}
        />
      )}
    </div>
  );
}
