import clsx from 'clsx';

import { useStore } from '@store/useStore';

import CloseSVG from '../svg/CloseSVG';

export default function ModalClose() {
  const { isModalShow, showModalHandler } = useStore((state) => state);

  return (
    <div
      className={clsx(
        isModalShow ? '' : '-translate-y-[999px]',
        'fixed right-0 top-0 z-[1300] flex h-[10vh] w-full items-center justify-center duration-700',
        'lg:h-[20vh]'
      )}
    >
      <div
        className={clsx(
          'layout flex w-fit items-center justify-center rounded-full bg-custom-black p-3',
          'dark:bg-custom-green'
        )}
      >
        <button onClick={showModalHandler}>
          <CloseSVG
            className={clsx(
              'mx-auto w-5 text-custom-green',
              'dark:text-custom-black',
              'md:w-6',
              'lg:w-6'
            )}
            fill='currentColor'
          />
        </button>
      </div>
    </div>
  );
}
