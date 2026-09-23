'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import InputForm from '@components/ui/input-form';
import { contactSchema, type ContactFormValues } from '@utils/contact-schema';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      from_name: '',
      from_email: '',
      subject: '',
      message: '',
    },
  });

  const submitHandler = async (data: ContactFormValues) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        { ...data },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );
      toast.success('Message sent successfully', { duration: 3000 });
      reset();
    } catch (error) {
      toast.error('Something went wrong', { duration: 3000 });
      console.error(error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      className='flex w-full flex-col justify-center gap-y-4'
    >
      <div className={clsx('grid grid-cols-1 gap-4', 'md:grid-cols-2')}>
        <InputForm
          title='Name'
          type='text'
          error={errors.from_name?.message}
          {...register('from_name')}
        />
        <InputForm
          title='Email'
          type='email'
          error={errors.from_email?.message}
          {...register('from_email')}
        />
      </div>
      <InputForm
        title='Subject'
        type='text'
        error={errors.subject?.message}
        {...register('subject')}
      />
      <InputForm
        title='Message'
        isTextArea
        error={errors.message?.message}
        {...register('message')}
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className={clsx(
          'mx-auto flex w-fit items-center justify-center gap-x-2 rounded-full bg-primary px-8 py-3',
          'text-label-lg font-medium text-on-primary transition-all duration-200',
          'hover:bg-primary/92 hover:shadow-md active:scale-95',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          'disabled:cursor-not-allowed disabled:bg-on-surface/[0.12] disabled:text-on-surface/[0.38] disabled:shadow-none'
        )}
      >
        {isSubmitting && (
          <span
            aria-hidden='true'
            className='size-4 animate-spin rounded-full border-2 border-current border-t-transparent'
          />
        )}
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
