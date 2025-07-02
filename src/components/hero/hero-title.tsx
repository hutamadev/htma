import clsx from 'clsx';
import { motion } from 'framer-motion';

import LoadingSkeleton from '@components/ui/loading-skeleton';

import { useStore } from '@store/useStore';

import { neutral } from '@utils/localFont';

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
          {...{
            className: clsx(
              'text-sm font-normal text-custom-black',
              'dark:text-custom-green',
              'md:text-base',
              'lg:text-lg',
              '2xl:text-xl'
            ),
            initial: { opacity: 0, x: -24 },
            animate: {
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.3,
                duration: 0.6,
              },
            },
            exit: { opacity: 0, x: -24 },
          }}
        >
          hello, I'm
        </motion.h1>
      ) : (
        <LoadingSkeleton className={clsx('h-2 w-20', 'lg:h-5 lg:w-28')} />
      )}

      <div
        className={clsx(
          !isClient && 'lg:gap-y-2',
          'flex flex-row items-center gap-x-1',
          'lg:flex-col lg:items-start'
        )}
      >
        {isClient ? (
          <>
            <motion.h1
              {...{
                className: clsx(
                  neutral.className,
                  'nameBaffle relative z-[1200] whitespace-nowrap text-base font-bold text-custom-black',
                  'dark:text-custom-green',
                  'md:text-2xl',
                  'lg:whitespace-normal lg:text-4xl',
                  '2xl:text-5xl'
                ),
                initial: { opacity: 0, x: -24 },
                animate: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.5, duration: 0.7 },
                },
                exit: { opacity: 0, x: -24 },
              }}
            >
              hutama
            </motion.h1>
            {/* <motion.h1
              className={clsx(
                neutral.className,
                'nameBaffle relative z-[1200] whitespace-nowrap text-base font-bold text-custom-black',
                'dark:text-custom-green',
                'md:text-2xl',
                'lg:whitespace-normal lg:text-4xl',
                '2xl:text-5xl'
              )}
              initial={{ opacity: 0, x: -24 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.7, duration: 0.7 },
              }}
              exit={{ opacity: 0, x: -24 }}
            >
            </motion.h1> */}
          </>
        ) : (
          <>
            <LoadingSkeleton className={clsx('h-6 w-24', 'lg:h-12 lg:w-80')} />
            <LoadingSkeleton className={clsx('h-6 w-24', 'lg:h-12 lg:w-80')} />
          </>
        )}
      </div>
      {isClient ? (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 0.9, duration: 0.7 },
          }}
          exit={{ opacity: 0, x: -24 }}
          {...{
            className: clsx(
              'w-fit whitespace-nowrap rounded bg-custom-black px-1 text-base font-light text-custom-green',
              'dark:text-custom-white-2',
              'md:text-lg',
              'lg:whitespace-normal lg:bg-transparent lg:text-2xl lg:font-thin lg:text-custom-black',
              '2xl:text-3xl'
            ),
          }}
        >
          --web developer
        </motion.div>
      ) : (
        <LoadingSkeleton className={clsx('h-4 w-40', 'lg:h-8 lg:w-56')} />
      )}
    </div>
  );
}
