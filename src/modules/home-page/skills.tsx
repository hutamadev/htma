import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

import { googleSansFlex } from '@utils/localFont';
import { langSkillsImage, libFrameSkillsImage } from '@utils/skills-image';
// Wide logos that need maximized horizontal span to balance optical weight against square logos
const WIDE_LOGOS: Record<string, boolean> = {
  NodeJs: true,
  Tailwind: true,
  DaisyUI: true,
  Sequelize: true,
  MYSQL: true,
};

// Logos that are pure black / dark monochrome that need inversion in dark mode
const DARK_INVERT_LOGOS: Record<string, boolean> = {
  'Next.js': true,
  ExpressJS: true,
};
interface ISkillCardProps {
  id: string;
  image: string;
  title: string;
  link: string;
}

function SkillCard({ image, title, link }: Readonly<ISkillCardProps>) {
  const isWide = Boolean(WIDE_LOGOS[title]);
  const needsInvert = Boolean(DARK_INVERT_LOGOS[title]);

  return (
    <li className='flex items-center justify-center'>
      <Link
        href={link}
        target='_blank'
        rel='noreferrer'
        aria-label={title}
        title={title}
        className={clsx(
          'group/skill relative flex items-center justify-center rounded-2xl',
          'h-14 w-14 sm:h-16 sm:w-16 2xl:h-[4.5rem] 2xl:w-[4.5rem]',
          'border border-outline-variant/25 bg-surface-container-low/70 dark:border-outline-variant/35 dark:bg-surface-container/50',
          'p-1.5 sm:p-2',
          'transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          'hover:z-10 hover:scale-[1.04] hover:border-outline-variant/50 hover:bg-surface-container dark:hover:border-outline-variant/60 dark:hover:bg-surface-container-high',
          'active:scale-95',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        )}
      >
        <div className='relative flex h-full w-full items-center justify-center'>
          <Image
            src={image}
            alt={title}
            width={56}
            height={56}
            className={clsx(
              'pointer-events-none object-contain transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] select-none',
              needsInvert && 'dark:brightness-0 dark:invert',
              isWide
                ? 'h-auto max-h-[85%] w-[92%]'
                : 'h-full max-h-[88%] w-full max-w-[88%]'
            )}
          />
        </div>
      </Link>
    </li>
  );
}

export default function Skills() {
  return (
    <section
      className={clsx(
        'group/skills flex cursor-default flex-col gap-y-8 border-b border-outline-variant py-8'
      )}
    >
      <div
        className={clsx(
          'section-header magnetic-item group/header relative flex h-full w-fit cursor-pointer items-center gap-x-2 rounded-xl bg-transparent px-3 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]',
          'ml-1 origin-left sm:ml-1.5',
          'group-hover/skills:bg-primary-container hover:scale-[1.03]'
        )}
      >
        <MdArrowForward
          className={clsx(
            'text-2xl text-primary transition-transform duration-300',
            'group-hover/header:-rotate-45 group-hover/skills:-rotate-45'
          )}
        />
        <h2
          className={clsx(
            googleSansFlex.className,
            'text-headline-sm font-medium text-on-surface transition-colors duration-300',
            'group-hover/header:text-on-primary-container group-hover/skills:text-on-primary-container',
            'dark:text-primary dark:group-hover/skills:text-on-primary-container'
          )}
        >
          skills
        </h2>
      </div>

      <div className='flex flex-col gap-y-4'>
        <h3 className='text-title-md font-medium text-on-surface-variant'>
          Main
        </h3>
        <ul className='grid grid-cols-4 gap-3 px-1 py-1 sm:grid-cols-6 sm:gap-4 md:grid-cols-6 lg:grid-cols-8'>
          {langSkillsImage.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </ul>
      </div>

      <div className='flex flex-col gap-y-4'>
        <h3 className='text-title-md font-medium text-on-surface-variant'>
          Library & Framework
        </h3>
        <ul className='grid grid-cols-4 gap-3 px-1 py-1 sm:grid-cols-6 sm:gap-4 md:grid-cols-6 lg:grid-cols-8'>
          {libFrameSkillsImage.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </ul>
      </div>
    </section>
  );
}
