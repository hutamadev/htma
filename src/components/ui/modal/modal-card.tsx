'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MdLink } from 'react-icons/md';

import { useStore } from '@store/useStore';

import { googleSansFlex } from '@utils/localFont';
import { m3Motion } from '@utils/motion';

import NextImage from '../next-image';
import GithubSVG from '../svg/GithubSVG';
import ModalClose from './modal-close';

export interface IModalCardProps {
  outerClassName?: string;
  innerClassName?: string;
}

const SHEET_CONTENT_ID = 'portfolio-sheet-content';

const sheetVariants = {
  closed: { y: '100%', opacity: 0 },
  open: { y: 0, opacity: 1 },
};

/**
 * M3 Expressive spatial/default spring. Damping is pushed to critical
 * (2 * √700 ≈ 53 → dampingRatio 1.0) instead of the shared sample value 16
 * (ratio 0.6): a ~9% overshoot on a vertical translate that is edge-anchored to
 * the viewport bottom lifts the sheet off the bottom edge and flashes the page
 * behind it. Scale animations keep the bouncy sample value.
 */
const sheetTransition = {
  ...m3Motion.spatial.default,
  damping: 53,
} as const;

export default function ModalCard({
  innerClassName,
  outerClassName,
}: Readonly<IModalCardProps>) {
  const {
    isModalShow,
    isModalExpanded,
    portfolioData,
    toggleModalExpandedHandler,
  } = useStore((state) => state);

  return (
    <section
      className={clsx(
        outerClassName,
        'pointer-events-none fixed inset-0 z-[1300] flex items-end justify-center lg:items-center',
        'sm:px-14'
      )}
    >
      <motion.div
        variants={sheetVariants}
        initial='closed'
        animate={isModalShow ? 'open' : 'closed'}
        transition={sheetTransition}
        className='flex w-full max-w-[640px] justify-center lg:max-w-5xl'
      >
        <dialog
          open
          inert={!isModalShow}
          aria-label={`${portfolioData?.title ?? 'Portfolio'} detail`}
          className={clsx(
            innerClassName,
            // `static` is load-bearing: the UA stylesheet gives <dialog>
            // `position: absolute; inset-inline-start: 0`, which takes it out of
            // the flex flow — it then ignores items-end/justify-center and hangs
            // a full sheet-height below the viewport. As a flex item it is
            // anchored and centred by the ancestors instead.
            // Bottom-anchored sheet below lg; a centred two-column dialog from lg up,
            // which is why every corner rounds there instead of only the top two.
            'static m-0 flex w-full max-w-[640px] flex-col overflow-hidden rounded-t-xl border-0 bg-surface-container-low p-0 text-left shadow-2xl lg:max-w-5xl lg:rounded-xl',
            // Mobile peek sits in a 60–65dvh band rather than at a bare cap: the
            // longest sheet content is ~54dvh of a 390x844 viewport, so a cap
            // alone would never bind and the sheet would stay short. The min also
            // has to outlive the expanded state, otherwise expanding short
            // content would shrink the sheet.
            'min-h-[60dvh] sm:min-h-0',
            // On desktop the two columns make the content short enough to fit, so
            // the peek cap is lifted and only the 90dvh safety net stays: a very
            // long description is still clipped and scrolls instead of running off
            // the screen.
            isModalExpanded
              ? 'max-h-[90dvh]'
              : 'max-h-[65dvh] sm:max-h-[50dvh] lg:max-h-[90dvh]',
            isModalShow ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          {/* Drag handle (32x4dp, on-surface-variant) doubling as the M3
              single-pointer height toggle: this sheet has no drag gesture, so the
              spec requires an explicit control to switch preset heights. */}
          <div className='relative flex shrink-0 items-center justify-center pt-3 pb-1 lg:h-18 lg:pt-6 lg:pb-0'>
            <button
              type='button'
              onClick={toggleModalExpandedHandler}
              aria-expanded={isModalExpanded}
              aria-controls={SHEET_CONTENT_ID}
              aria-label={
                isModalExpanded
                  ? 'Collapse portfolio detail'
                  : 'Expand portfolio detail'
              }
              className='flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 hover:bg-on-surface/8 lg:hidden'
            >
              <span className='h-1 w-8 rounded-full bg-on-surface-variant' />
            </button>
            <ModalClose />
          </div>

          <div
            id={SHEET_CONTENT_ID}
            data-lenis-prevent
            className='min-h-0 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6 lg:p-6'
          >
            {portfolioData?.image && (
              <div className='px-4 sm:px-6 lg:p-0'>
                <NextImage
                  src={portfolioData.image}
                  alt={`portfolio ${portfolioData.title}`}
                  width={640}
                  height={360}
                  className='w-full overflow-hidden'
                  imgClassName='aspect-[16/9] w-full rounded-lg object-cover object-center lg:aspect-[4/3]'
                />
              </div>
            )}

            <div className='px-4 pt-5 pb-6 sm:px-6 lg:flex lg:h-full lg:flex-col lg:p-0'>
              <h1
                className={clsx(
                  googleSansFlex.className,
                  'text-start text-headline-sm text-on-surface uppercase',
                  'md:text-headline-md'
                )}
              >
                {portfolioData?.title}.
              </h1>
              {portfolioData?.description && (
                <p className='mt-2 text-start text-body-md text-on-surface-variant md:text-body-lg lg:mt-4'>
                  {portfolioData.description}
                </p>
              )}
              {/* M3 dialog anatomy: actions sit at the bottom of the container,
                  so on desktop they are pushed to the bottom of the text column
                  instead of leaving ~180px dead space under the buttons. */}
              <div className='mt-6 flex flex-row items-center gap-x-2 lg:mt-auto'>
                {portfolioData?.repo && (
                  <a
                    href={portfolioData.repo}
                    target='_blank'
                    rel='noreferrer'
                    className='flex w-full items-center justify-center gap-x-2 rounded-full bg-secondary-container px-4 py-3 text-title-sm font-medium text-on-secondary-container transition-all duration-200 hover:bg-secondary-container/92 active:scale-95'
                  >
                    <GithubSVG className='w-5' fill='currentColor' />
                    Repository
                  </a>
                )}
                {portfolioData?.url && (
                  <a
                    href={portfolioData.url}
                    target='_blank'
                    rel='noreferrer'
                    className='flex w-full items-center justify-center gap-x-2 rounded-full bg-primary px-4 py-3 text-title-sm font-medium text-on-primary transition-all duration-200 hover:bg-primary/92 active:scale-95'
                  >
                    <MdLink className='-rotate-45 text-xl' />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </dialog>
      </motion.div>
    </section>
  );
}
