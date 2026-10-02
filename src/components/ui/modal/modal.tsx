'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useStore } from '@store/useStore';

import ModalBackdrop from './modal-backdrop';
import ModalCard, { IModalCardProps } from './modal-card';

type IModalProps = IModalCardProps;

export default function Modal({
  innerClassName,
  outerClassName,
  ...props
}: Readonly<IModalProps>) {
  const {
    isClient,
    clientHandler,
    isModalShow,
    portfolioData,
    showModalHandler,
  } = useStore((state) => ({
    isClient: state.isClient,
    clientHandler: state.clientHandler,
    isModalShow: state.isModalShow,
    portfolioData: state.portfolioData,
    showModalHandler: state.showModalHandler,
  }));

  useEffect(() => {
    clientHandler();
  }, [clientHandler]);

  // The sheet is a native <dialog open> (not showModal()), so Escape is not wired
  // up by the browser — M3 modal sheets dismiss on Escape.
  useEffect(() => {
    if (!isModalShow) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') showModalHandler();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalShow, showModalHandler]);

  return (
    <div className='relative'>
      {isClient && (
        <>
          {createPortal(
            <ModalBackdrop />,
            document.getElementById('modal-backdrop')!
          )}
          {createPortal(
            <ModalCard
              // Keyed by selection only — NOT by isModalShow. Including the open
              // flag would remount the sheet the moment it closes, so the exit
              // variant would never play and the sheet would vanish instead of
              // sliding down. The preset height is reset by the store action
              // that opens the sheet, not by a remount.
              key={portfolioData?.id ?? 'none'}
              innerClassName={innerClassName}
              outerClassName={outerClassName}
              {...props}
            />,
            document.getElementById('modal-card')!
          )}
        </>
      )}
    </div>
  );
}
