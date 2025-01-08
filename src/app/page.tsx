import { Metadata } from 'next';

import Footer from '@components/footer/footer';
import PageWrapper from '@components/ui/page-wrapper';

import About from '@modules/home-page/about';
import Portfolio from '@modules/home-page/portfolio';
import Skills from '@modules/home-page/skills';

export const metadata: Metadata = {
  title: 'htma',
  description: 'hutama portfolio website',
};

export default function HomePage() {
  return (
    <PageWrapper>
      <div className='mb-8 pt-[clamp(5.875rem,_0.0294rem_+_7.7941vw,_12.5rem)]'>
        <div className='w-full'>
          <About />
          <Skills />
          <Portfolio />
          <Footer />
        </div>
      </div>
    </PageWrapper>
  );
}
