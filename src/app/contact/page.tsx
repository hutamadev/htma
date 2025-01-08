import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import Footer from '@components/footer/footer';
import PageWrapper from '@components/ui/page-wrapper';

import Contact from '@modules/contact-page/contact';

export const metadata: Metadata = {
  title: 'contact',
  description: 'hutama portfolio website - contact',
};

export default function ContactPage() {
  return (
    <>
      <Toaster position='top-center' />

      <PageWrapper>
        <div className='mb-8 pt-[clamp(5.875rem,_0.0294rem_+_7.7941vw,_12.5rem)]'>
          <div className='w-full'>
            <Contact />
            <Footer />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
