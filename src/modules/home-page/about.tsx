import clsx from 'clsx';
import { MdArrowForward } from 'react-icons/md';

import { neutral } from '@utils/localFont';

export default function About() {
  return (
    <section
      className={clsx(
        'group flex cursor-default flex-col gap-y-6 border-y border-y-custom-black/50 py-6',
        'dark:border-y-custom-white-2/50'
      )}
    >
      <div
        className={clsx(
          'relative flex h-full w-fit items-center gap-x-1 bg-transparent pt-1 pr-2 duration-300',
          'group-hover:rounded group-hover:bg-custom-black'
        )}
      >
        <MdArrowForward
          className={clsx(
            'relative -top-1 text-3xl text-custom-green duration-500',
            'group-hover:-rotate-45'
          )}
        />
        <h1
          className={clsx(
            neutral.className,
            'text-xl font-normal text-custom-black',
            'group-hover:text-custom-green',
            'lg:text-2xl',
            'dark:text-custom-green'
          )}
        >
          about
        </h1>
      </div>
      <article
        className={clsx(
          'flex flex-col gap-y-4 leading-relaxed text-custom-black',
          'dark:text-custom-white-2'
        )}
      >
        <p className={clsx('text-sm', 'md:text-base')}>
          Hello, I'm{' '}
          <span className='rounded bg-custom-black px-1 py-px text-custom-green'>
            Hutama
          </span>
          , a web developer who creates beautiful and functional websites. With
          a focus on simplicity and user experience, I specialize in
          transforming ideas into visually appealing and easy-to-use digital
          interfaces.
        </p>
        <p className={clsx('text-sm', 'md:text-base')}>
          Continual growth and learning are important to me as a web developer.
          I stay up to date with the latest industry trends and tools, embracing
          new technologies to deliver modern and forward-thinking solutions.
        </p>
      </article>
    </section>
  );
}
