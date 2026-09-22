'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarList = [
  {
    title: 'home',
    link: '/',
  },
  {
    title: 'contact',
    link: '/contact',
  },
];

export default function SidebarLink() {
  const pathname = usePathname();

  return (
    <>
      {sidebarList.map((side) => {
        // M3 active indicator: primary-container pill for the current route, a
        // plain state layer for the rest. Colour roles resolve per theme via
        // CSS variables, so no dark: variants are needed.
        const isActive = pathname === side.link;

        return (
          <li
            key={side.title}
            className={clsx(
              isActive
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-on-surface/8',
              'rotate-90 rounded-full px-4 py-1.5 text-label-lg transition-colors duration-200'
            )}
          >
            <Link href={side.link}>{side.title}</Link>
          </li>
        );
      })}
    </>
  );
}
