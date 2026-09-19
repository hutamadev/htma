import clsx from 'clsx';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

import NextImage from '@components/ui/next-image';

import { googleSansFlex } from '@utils/localFont';
import { langSkillsImage, libFrameSkillsImage } from '@utils/skills-image';

export default function Skills() {
  return (
    <section
      className={clsx(
        'group flex cursor-default flex-col gap-y-6 border-b border-b-custom-black/50 py-6',
        'dark:border-b-custom-white-2/50'
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
            googleSansFlex.className,
            'text-xl text-custom-black',
            'group-hover:text-custom-green',
            'lg:text-2xl',
            'dark:text-custom-green'
          )}
        >
          skills
        </h1>
      </div>
      <div className='flex flex-col gap-y-4'>
        <h2
          className={clsx(
            'text-base text-custom-black',
            '2xl:text-lg',
            'dark:text-custom-white-2'
          )}
        >
          Main
        </h2>
        <ul
          className={clsx(
            'grid grid-cols-4 items-center justify-items-center gap-4',
            'md:grid-cols-8'
          )}
        >
          {langSkillsImage.map(({ id, image, title, link }, index) => (
            <li key={id} className='flex aspect-square w-fit items-center'>
              <Link href={link} target='_blank' rel='noreferrer'>
                <NextImage
                  src={image}
                  alt={title}
                  width={75}
                  height={75}
                  imgClassName='object-contain aspect-[3/3]'
                  className={clsx(
                    index === 0 ? 'bg-custom-white-2 p-1' : '',
                    index === 1 ? 'bg-custom-white-2 p-1' : '',
                    'flex w-10 items-center justify-center rounded-sm',
                    'md:w-14',
                    '2xl:w-[4.5rem]'
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-y-4'>
        <h2
          className={clsx(
            'text-base text-custom-black',
            '2xl:text-lg',
            'dark:text-custom-white-2'
          )}
        >
          Library & Framework
        </h2>
        <ul
          className={clsx(
            'grid grid-cols-4 items-center justify-items-center gap-4',
            'md:grid-cols-8'
          )}
        >
          {libFrameSkillsImage.map(({ id, image, title, link }, index) => (
            <li key={id} className='flex aspect-square w-fit items-center'>
              <Link href={link} target='_blank' rel='noreferrer'>
                <NextImage
                  src={image}
                  alt={title}
                  width={75}
                  height={75}
                  imgClassName='object-contain aspect-[3/3]'
                  className={clsx(
                    index === 2 ||
                      index === 3 ||
                      index === 5 ||
                      index === 6 ||
                      index === 7
                      ? clsx('bg-custom-white-2', 'dark:p-[2px]')
                      : '',
                    'flex w-10 items-center justify-center rounded-sm',
                    'md:w-14',
                    '2xl:w-[4.5rem]'
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
