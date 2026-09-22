import clsx from 'clsx';

import { useStore } from '@store/useStore';

import CloseSVG from '../svg/CloseSVG';

export default function ModalClose() {
  const { isModalShow, showModalHandler } = useStore((state) => state);

  return (
    <div
      className={clsx(
        'fixed top-4 right-4 z-[1400] duration-300',
        'md:top-6 md:right-6',
        isModalShow ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <button
        type='button'
        onClick={showModalHandler}
        aria-label='Close portfolio detail'
        className='flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-highest text-on-surface shadow-lg transition-colors duration-200 hover:bg-on-surface/8'
      >
        <CloseSVG className='w-5' fill='currentColor' />
      </button>
    </div>
  );
}
