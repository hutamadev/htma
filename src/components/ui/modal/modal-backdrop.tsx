import { useStore } from '@store/useStore';

export default function ModalBackdrop() {
  const { isModalShow, showModalHandler } = useStore((state) => state);

  return (
    <>
      {isModalShow && (
        <button
          type='button'
          aria-label='Close modal'
          className='fixed top-0 left-0 z-[1250] min-h-full w-full cursor-default border-none bg-slate-800/70 p-0'
          onClick={showModalHandler}
        />
      )}
    </>
  );
}
