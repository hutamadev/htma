'use client';

import dynamic from 'next/dynamic';

import LoadingSkeleton from '@components/ui/loading-skeleton';

/**
 * The form drags zod, react-hook-form, and @emailjs/browser (~113 KiB) into the
 * critical path of /contact for a widget that sits below the fold. Deferring it
 * to its own chunk keeps that weight out of the initial JS; the skeleton copies
 * the field geometry measured from the real form (58px fields, 161px five-row
 * textarea, 45px pill button, 16px gaps -> 370px total at md and above) so
 * mounting the real form cannot shift the layout.
 */
function ContactFormPlaceholder() {
  return (
    <div className='flex w-full flex-col justify-center gap-y-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <LoadingSkeleton className='h-[3.625rem] rounded-t-xs' />
        <LoadingSkeleton className='h-[3.625rem] rounded-t-xs' />
      </div>
      <LoadingSkeleton className='h-[3.625rem] rounded-t-xs' />
      <LoadingSkeleton className='h-[10.0625rem] rounded-t-xs' />
      <LoadingSkeleton className='mx-auto h-[2.8125rem] w-24 rounded-full' />
    </div>
  );
}

const ContactForm = dynamic(() => import('./contact-form'), {
  ssr: false,
  loading: () => <ContactFormPlaceholder />,
});

export default ContactForm;
