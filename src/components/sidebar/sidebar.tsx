import clsx from 'clsx';

import ScrollTop from '@components/ui/scroll-top';

import SidebarLink from './sidebar-link';

export default function Sidebar() {
  return (
    <aside className='sticky top-0 z-[1080] col-start-12 col-end-12 h-screen'>
      <div className='flex h-full flex-col items-center justify-between'>
        <ul
          className={clsx(
            'flex h-full flex-col items-center justify-center gap-y-12',
            'lg:relative lg:top-4 lg:gap-y-16 lg:rounded-t-[28px] lg:bg-surface-container-highest'
          )}
        >
          <SidebarLink />
        </ul>
        <ScrollTop />
      </div>
    </aside>
  );
}
