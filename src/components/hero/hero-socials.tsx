import clsx from 'clsx';
import Link from 'next/link';

import LoadingSkeleton from '@components/ui/loading-skeleton';
import GithubSVG from '@components/ui/svg/GithubSVG';

import { useStore } from '@store/useStore';

const socials = [
  {
    id: '01',
    title: 'GitHub',
    href: 'https://github.com/hutamadev',
    image: GithubSVG,
  },
];

export default function HeroSocials() {
  const isClient = useStore((state) => state.isClient);
  return (
    <ul
      className={clsx(
        'flex w-full -rotate-90 items-center justify-evenly gap-x-4',
        'md:gap-x-1',
        'lg:rotate-0 lg:py-8'
      )}
    >
      {isClient ? (
        <>
          {socials.map((item) => (
            <li key={item.id} className='flex items-center'>
              <Link
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className={clsx(
                  'group/link flex items-center gap-x-3 rounded-3xl p-2 text-sm text-custom-black duration-300',
                  'md:text-lg',
                  'lg:p-[clamp(0.875rem,_0.6544rem_+_0.2941vw,_1.125rem)_clamp(1.5rem,_1.0588rem_+_0.5882vw,_2rem)]',
                  'hover:bg-custom-green',
                  'dark:text-custom-green dark:hover:text-custom-black'
                )}
              >
                <item.image
                  className={clsx(
                    'mb-1 w-5 text-custom-black',
                    'group-hover/link:dark:text-custom-black',
                    'dark:text-custom-green'
                  )}
                  fill='currentColor'
                />
                {item.title}
              </Link>
            </li>
          ))}
        </>
      ) : (
        <LoadingSkeleton className={clsx('h-4 w-40', 'lg:h-8 lg:w-80')} />
      )}
    </ul>
  );
}
