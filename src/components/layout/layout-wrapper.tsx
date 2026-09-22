import clsx from 'clsx';

import Hero from '@components/hero/hero';
import Navigation from '@components/navigation/navigation';
import Sidebar from '@components/sidebar/sidebar';
import CustomCursor from '@components/ui/custom-cursor';
import Modal from '@components/ui/modal/modal';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<ILayoutProps>) {
  return (
    <>
      <Navigation />
      <main>
        <CustomCursor />
        <section className='layout flex justify-center'>
          <div className={clsx('grid-12 gap-2', 'md:gap-6')}>
            <Hero />
            {children}
            <Sidebar />
            <Modal />
          </div>
        </section>
      </main>
      <div
        className={clsx(
          'visible fixed bottom-0 z-[1050] h-[8%] w-full bg-surface mask-bottom'
        )}
      ></div>
    </>
  );
}
