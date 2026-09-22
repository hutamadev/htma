import clsx from 'clsx';
import { MdArrowForward } from 'react-icons/md';

import { googleSansFlex } from '@utils/localFont';

export default function About() {
  return (
    <section
      className={clsx(
        'group/about flex cursor-default flex-col gap-y-6 border-y border-outline-variant py-8'
      )}
    >
      <div
        className={clsx(
          'section-header magnetic-item group/header relative flex h-full w-fit cursor-pointer items-center gap-x-2 rounded-xl bg-transparent px-3 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          'ml-1 origin-left sm:ml-1.5',
          'group-hover/about:bg-primary-container hover:scale-[1.03]'
        )}
      >
        <MdArrowForward
          className={clsx(
            'text-2xl text-primary transition-transform duration-300',
            'group-hover/about:-rotate-45 group-hover/header:-rotate-45'
          )}
        />
        <h2
          className={clsx(
            googleSansFlex.className,
            'text-headline-sm font-medium text-on-surface transition-colors duration-300',
            'group-hover/about:text-on-primary-container group-hover/header:text-on-primary-container',
            'dark:text-primary dark:group-hover/about:text-on-primary-container'
          )}
        >
          about
        </h2>
      </div>
      <article className='flex flex-col gap-y-4 leading-relaxed text-on-surface'>
        <p className='text-body-md md:text-body-lg'>
          Hi, I'm <strong className='font-semibold'>Hutama</strong>, a web
          developer who builds clean, fast, and responsive websites. I enjoy
          turning visual designs into functional code, making sure each
          interface is intuitive, accessible, and comfortable to use.
        </p>
        <p className='text-body-md md:text-body-lg'>
          I pay close attention to the details, from writing maintainable code
          under the hood to refining layouts and interaction feel. Since the web
          evolves constantly, I keep learning and working with modern tools to
          deliver solid, dependable products.
        </p>
      </article>
    </section>
  );
}
