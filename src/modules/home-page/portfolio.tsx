'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

import Card from '@components/ui/card-base';
import NextImage from '@components/ui/next-image';

import { useStore } from '@store/useStore';

import { googleSansFlex } from '@utils/localFont';
import { portfolioData } from '@utils/portfolio-data';

export default function Portfolio() {
  const { addPortfolio, showModalHandler } = useStore((state) => state);

  const portfolioHandler = (portfolio: IPortfolio) => {
    addPortfolio(portfolio);
    showModalHandler();
  };

  return (
    <section className='group/portfolio flex cursor-default flex-col gap-y-6 border-b border-outline-variant py-6'>
      <div
        className={clsx(
          'section-header magnetic-item group/header relative flex h-full w-fit cursor-pointer items-center gap-x-2 rounded-xl bg-transparent px-3 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          'ml-1 origin-left sm:ml-1.5',
          'group-hover/portfolio:bg-primary-container hover:scale-[1.03]'
        )}
      >
        <MdArrowForward
          className={clsx(
            'text-2xl text-primary transition-transform duration-300',
            'group-hover/header:-rotate-45 group-hover/portfolio:-rotate-45'
          )}
        />
        <h2
          className={clsx(
            googleSansFlex.className,
            'text-headline-sm font-medium text-on-surface transition-colors duration-300',
            'group-hover/header:text-on-primary-container group-hover/portfolio:text-on-primary-container',
            'dark:text-primary dark:group-hover/portfolio:text-on-primary-container'
          )}
        >
          my portfolio
        </h2>
      </div>

      {/* Auto rows keep each card sized to its own content, so no card squeezes another */}
      <ul className='mx-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {portfolioData.map((portfolio, index) => {
          return (
            <li
              key={portfolio.id}
              className={clsx(index === 0 && 'md:col-span-2')}
            >
              <button
                type='button'
                aria-label={`View ${portfolio.title} detail`}
                onClick={portfolioHandler.bind(null, portfolio)}
                className='block h-full w-full'
              >
                <Card
                  className={clsx(
                    'h-full overflow-hidden bg-surface-container',
                    'rounded-[24px] transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
                    'hover:rounded-[28px] hover:bg-surface-container-high hover:shadow-lg',
                    'active:scale-[0.98] active:rounded-[16px]'
                  )}
                >
                  <NextImage
                    src={portfolio.image}
                    alt={portfolio.title}
                    width={600}
                    height={600}
                    className='w-full overflow-hidden rounded-[inherit]'
                    imgClassName='aspect-[16/9] w-full object-cover object-center'
                  />
                  <div className='p-6 text-left'>
                    <h3 className='text-title-md font-medium text-on-surface sm:text-title-lg'>
                      {portfolio.title}
                    </h3>
                    <p className='mt-2 text-body-sm text-on-surface-variant sm:text-body-md'>
                      {portfolio.description}
                    </p>
                  </div>
                </Card>
              </button>
            </li>
          );
        })}
      </ul>

      <p
        className={clsx(
          'flex flex-col items-center justify-center gap-x-1 text-center text-on-surface-variant',
          'md:flex-row'
        )}
      >
        For other portfolio, you can visit my GitHub at{' '}
        <Link
          href='https://github.com/hutamadev'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary underline'
        >
          {' '}
          github.com/hutamadev.
        </Link>
      </p>
    </section>
  );
}
