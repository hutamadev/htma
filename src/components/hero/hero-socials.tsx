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
                aria-label={item.title}
                className={clsx(
                  'group/link flex items-center gap-x-3 rounded-full bg-secondary-container px-6 py-3 font-medium text-on-secondary-container',
                  'text-label-lg md:text-title-sm',
                  'transition-all duration-200 hover:bg-secondary-container/92 active:scale-95',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                )}
              >
                <item.image
                  className='w-5 text-on-secondary-container'
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
