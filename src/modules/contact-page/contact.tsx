import clsx from 'clsx';
import { MdArrowForward } from 'react-icons/md';

import { googleSansFlex } from '@utils/localFont';

import ContactForm from './contact-form';

export default function Contact() {
  return (
    <section
      className={clsx(
        'group/contact flex cursor-default flex-col gap-y-6 border-y border-outline-variant py-8'
      )}
    >
      <div
        className={clsx(
          'section-header magnetic-item group/header relative flex h-full w-fit cursor-pointer items-center gap-x-2 rounded-xl bg-transparent px-3 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          'ml-1 origin-left sm:ml-1.5',
          'group-hover/contact:bg-primary-container hover:scale-[1.03]'
        )}
      >
        <MdArrowForward
          className={clsx(
            'text-2xl text-primary transition-transform duration-300',
            'group-hover/contact:-rotate-45 group-hover/header:-rotate-45'
          )}
        />
        <h1
          className={clsx(
            googleSansFlex.className,
            'text-headline-sm font-medium text-on-surface transition-colors duration-300',
            'group-hover/contact:text-on-primary-container group-hover/header:text-on-primary-container',
            'dark:text-primary dark:group-hover/contact:text-on-primary-container'
          )}
        >
          contact
        </h1>
      </div>
      <p className='text-center text-body-lg text-on-surface-variant'>
        Need to get in touch? You're just a message away from reaching me.
      </p>
      <ContactForm />
    </section>
  );
}
