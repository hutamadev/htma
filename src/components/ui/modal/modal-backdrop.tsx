import clsx from 'clsx';

import { useStore } from '@store/useStore';

export default function ModalBackdrop() {
  const { isModalShow, showModalHandler } = useStore((state) => state);

  return (
    <button
      type='button'
      aria-label='Close portfolio detail'
      aria-hidden={!isModalShow}
      tabIndex={isModalShow ? 0 : -1}
      onClick={showModalHandler}
      className={clsx(
        'fixed inset-0 z-[1250] min-h-full w-full cursor-default border-none bg-on-surface/32 p-0 transition-opacity duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
        isModalShow ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    />
  );
}
