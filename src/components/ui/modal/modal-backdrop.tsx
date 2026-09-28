import { useStore } from '@store/useStore';

export default function ModalBackdrop() {
  const { isModalShow, showModalHandler } = useStore((state) => state);

  if (!isModalShow) return null;

  return (
    <button
      type='button'
      aria-label='Close modal'
      className='fixed inset-0 z-[1250] min-h-full w-full cursor-default border-none bg-on-surface/32 p-0'
      onClick={showModalHandler}
    />
  );
}
