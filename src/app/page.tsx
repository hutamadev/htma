import { Metadata } from 'next';

import Footer from '@components/footer/footer';
import PageWrapper from '@components/ui/page-wrapper';

import About from '@modules/home-page/about';
import HomeContent from '@modules/home-page/home-content';
import Portfolio from '@modules/home-page/portfolio';
import Skills from '@modules/home-page/skills';

export const metadata: Metadata = {
  title: {
    absolute: 'Hutama — Web Developer',
  },
  description:
    'Portfolio of Hutama, showcasing web applications, responsive user interfaces, and full-stack engineering with React, Next.js, and TypeScript.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <PageWrapper>
      <div className='mb-8 pt-[clamp(5.875rem,_0.0294rem_+_7.7941vw,_12.5rem)]'>
        <div className='w-full'>
          <HomeContent>
            <About />
            <Skills />
            <Portfolio />
            <Footer />
          </HomeContent>
        </div>
      </div>
    </PageWrapper>
  );
}
