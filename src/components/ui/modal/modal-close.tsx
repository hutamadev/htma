import { useStore } from '@store/useStore';

import CloseSVG from '../svg/CloseSVG';

/**
 * Sheet-anchored M3 icon button. Positioning is left to the parent (the sheet
 * header) — the old fixed screen top-right placement does not make sense for a
 * bottom-anchored sheet.
 */
export default function ModalClose() {
  const showModalHandler = useStore((state) => state.showModalHandler);

  return (
    <button
      type='button'
      onClick={showModalHandler}
      aria-label='Close portfolio detail'
      className='absolute top-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-highest text-on-surface transition-colors duration-200 hover:bg-on-surface/8 lg:top-6 lg:right-6'
    >
      <CloseSVG className='w-6' fill='currentColor' />
    </button>
  );
}
