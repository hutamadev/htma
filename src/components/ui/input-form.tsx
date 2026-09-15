import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
} from 'react';

type RefType = HTMLInputElement | HTMLTextAreaElement;

interface IInputFormProps extends DetailedHTMLProps<
  InputHTMLAttributes<RefType>,
  RefType
> {
  title: string;
  isTextArea?: boolean;
  className?: string;
}

const InputForm = forwardRef<unknown, IInputFormProps>(
  ({ title, isTextArea, className, ...props }: IInputFormProps, ref) => {
    let inputContent = (
      <input
        {...props}
        ref={ref as LegacyRef<HTMLInputElement>}
        className={clsx(
          className,
          'border-b-2 border-b-custom-black/50 bg-custom-white-2 p-2 text-custom-black outline-none',
          'dark:border-b-custom-white-2/50 dark:bg-custom-black dark:text-custom-green'
        )}
      />
    );

    if (isTextArea) {
      inputContent = (
        <textarea
          {...props}
          rows={5}
          cols={50}
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          className={clsx(
            className,
            'rounded border-2 border-custom-black/50 bg-custom-white-2 p-2 text-custom-black outline-none',
            'dark:border-custom-white-2/50 dark:bg-custom-black dark:text-custom-green'
          )}
        ></textarea>
      );
    }
    return (
      <div className='flex flex-col gap-y-2'>
        <label
          className={clsx(
            'text-sm font-medium text-custom-black',
            'dark:text-custom-green',
            'lg:text-base'
          )}
        >
          {title}
        </label>
        {inputContent}
      </div>
    );
  }
);

export default InputForm;
