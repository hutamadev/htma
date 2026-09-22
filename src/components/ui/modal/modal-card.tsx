import clsx from 'clsx';
import { MdLink } from 'react-icons/md';

import { useStore } from '@store/useStore';

import { googleSansFlex } from '@utils/localFont';

import NextImage from '../next-image';
import GithubSVG from '../svg/GithubSVG';

export interface IModalCardProps {
  outerClassName?: string;
  innerClassName?: string;
}

export default function ModalCard({
  innerClassName,
  outerClassName,
}: Readonly<IModalCardProps>) {
  const { isModalShow, portfolioData } = useStore((state) => state);

  return (
    <section
      className={clsx(
        outerClassName,
        'pointer-events-none fixed inset-0 z-[1300] flex items-center justify-center p-4 duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
        isModalShow ? 'opacity-100' : 'opacity-0'
      )}
    >
      <dialog
        open
        inert={!isModalShow}
        aria-label={`${portfolioData?.title ?? 'Portfolio'} detail`}
        className={clsx(
          innerClassName,
          'static m-0 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl border-0 bg-surface-container-high p-6 text-left shadow-2xl duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          isModalShow
            ? 'pointer-events-auto scale-100'
            : 'pointer-events-none scale-[0.92]'
        )}
      >
        <div
          className={clsx(
            'grid w-full grid-cols-1 gap-6 rounded-lg bg-surface-container p-4',
            'lg:grid-cols-2'
          )}
        >
          <div className={clsx('grid grid-cols-1')}>
            <h1
              className={clsx(
                googleSansFlex.className,
                'text-start text-4xl text-on-surface uppercase',
                'md:text-5xl'
              )}
            >
              {portfolioData?.title}.
            </h1>
            {portfolioData?.description && (
              <p className='mt-3 text-start text-body-lg text-on-surface-variant'>
                {portfolioData.description}
              </p>
            )}
            <div
              className={clsx(
                'mt-6 flex flex-row items-center',
                'md:items-end',
                portfolioData?.repo && 'gap-x-4'
              )}
            >
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
              <a
                href={portfolioData?.url as string}
                target='_blank'
                rel='noreferrer'
                className='flex w-full items-center justify-center gap-x-2 rounded-full bg-primary px-4 py-3 text-title-sm font-medium text-on-primary transition-all duration-200 hover:bg-primary/92 active:scale-95'
              >
                <MdLink className='-rotate-45 text-xl' />
                Demo
              </a>
            </div>
          </div>
          {portfolioData?.image && (
            <NextImage
              src={portfolioData.image}
              alt={`portfolio ${portfolioData?.title}}`}
              width={600}
              height={600}
              className='h-full w-full'
              imgClassName='h-[27rem] w-full rounded-lg object-cover object-center'
            />
          )}
        </div>
      </dialog>
    </section>
  );
}
