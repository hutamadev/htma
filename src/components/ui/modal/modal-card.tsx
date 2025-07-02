import clsx from 'clsx';
import { MdLink } from 'react-icons/md';

import { useStore } from '@store/useStore';

import { neutral } from '@utils/localFont';

import NextImage from '../next-image';
// import ArrowSVG from '../svg/ArrowSVG';
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
        isModalShow ? '' : 'translate-y-[999px]',
        'fixed bottom-0 left-0 z-[1300] h-[80vh] w-full overflow-scroll rounded-t-3xl bg-custom-white-2 p-6 text-center font-semibold uppercase shadow-custom-shadow duration-700',
        'dark:bg-custom-black',
        'md:h-fit'
      )}
    >
      <div
        className={clsx(
          innerClassName,
          'layout grid w-full grid-cols-1 gap-6 rounded-xl border-2 border-custom-black/70 p-4',
          'bg-custom-white-2 dark:border-custom-green/70',
          'lg:grid-cols-2'
        )}
      >
        <div className={clsx('grid grid-cols-1')}>
          <h1
            className={clsx(
              neutral.className,
              'text-start text-5xl uppercase text-custom-black',
              'md:text-7xl'
            )}
          >
            {portfolioData?.title}.
          </h1>
          <div
            className={clsx(
              'flex flex-row items-center',
              'md:items-end',
              portfolioData?.repo && 'gap-x-4'
            )}
          >
            {portfolioData?.repo && (
              <button
                className={clsx(
                  'flex w-full -translate-x-[0.2rem] -translate-y-[0.2rem] flex-row items-center justify-around rounded-xl border border-custom-black bg-custom-green px-4 py-4 shadow-[0.25rem_0.25rem_#24282C] duration-500',
                  'active:translate-x-0 active:translate-y-0 active:shadow-none',
                  'md:col-start-5 md:col-end-7'
                )}
              >
                <a
                  href={portfolioData.repo}
                  target='_blank'
                  rel='noreferrer'
                  className={clsx(
                    'flex items-center gap-x-1 text-base text-custom-black',
                    'md:text-2xl'
                  )}
                >
                  <GithubSVG
                    className={clsx('w-4 text-custom-black', 'md:w-5')}
                    fill='currentColor'
                  />
                  Repository
                </a>
              </button>
            )}
            <button
              className={clsx(
                'flex w-full -translate-x-[0.2rem] -translate-y-[0.2rem] flex-row items-center justify-around rounded-xl border border-custom-black bg-custom-green px-4 py-4 shadow-[0.25rem_0.25rem_#24282C] duration-500',
                'active:translate-x-0 active:translate-y-0 active:shadow-none',
                'md:col-start-5 md:col-end-7'
              )}
            >
              <a
                href={portfolioData?.url as string}
                target='_blank'
                rel='noreferrer'
                className={clsx(
                  'flex items-center gap-x-1 text-base text-custom-black',
                  'md:text-2xl'
                )}
              >
                <MdLink className={clsx('-rotate-45 text-xl', 'lg:text-2xl')} />
                Demo
              </a>
            </button>
          </div>
        </div>
        {portfolioData?.image && (
          <NextImage
            src={portfolioData.image}
            alt={`portfolio ${portfolioData?.title}}`}
            width={600}
            height={600}
            className={clsx('h-full w-full', '')}
            imgClassName={clsx(
              'h-[27rem] w-full rounded-xl object-cover object-center',
              'md:w-full'
            )}
          />
        )}
      </div>
    </section>
  );
}
