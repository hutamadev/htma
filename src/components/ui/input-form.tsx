'use client';

import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  LegacyRef,
  useId,
} from 'react';

type RefType = HTMLInputElement | HTMLTextAreaElement;

interface IInputFormProps extends DetailedHTMLProps<
  InputHTMLAttributes<RefType>,
  RefType
> {
  title: string;
  error?: string;
  isTextArea?: boolean;
}

const InputForm = forwardRef<RefType, IInputFormProps>(
  ({ title, error, isTextArea, ...props }: IInputFormProps, ref) => {
    const id = useId();
    const errorId = `${id}-error`;
    const hasError = Boolean(error);

    const fieldClassName = clsx(
      'peer w-full bg-transparent px-4 pt-6 pb-2 text-body-lg text-on-surface outline-none'
    );

    const fieldProps = {
      ...props,
      id,
      placeholder: ' ',
      'aria-invalid': hasError,
      'aria-describedby': hasError ? errorId : undefined,
      className: fieldClassName,
    };

    return (
      <div className='flex flex-col'>
        <div
          className={clsx(
            'relative rounded-t-xs border-b-2 bg-surface-container-highest transition-colors duration-200',
            hasError
              ? 'border-b-error'
              : 'border-b-outline focus-within:border-b-primary'
          )}
        >
          {isTextArea ? (
            <textarea
              {...fieldProps}
              ref={ref as LegacyRef<HTMLTextAreaElement>}
              rows={5}
              className={clsx(fieldClassName, 'resize-none')}
            />
          ) : (
            <input {...fieldProps} ref={ref as LegacyRef<HTMLInputElement>} />
          )}
          <label
            htmlFor={id}
            className={clsx(
              // Floated position (focused or filled) is the default; the resting
              // position only applies to an empty, unfocused field.
              'pointer-events-none absolute top-1.5 left-4 text-label-sm transition-all duration-200',
              'peer-[:placeholder-shown:not(:focus)]:top-4 peer-[:placeholder-shown:not(:focus)]:text-label-lg',
              hasError
                ? 'text-error'
                : 'text-on-surface-variant peer-focus:text-primary'
            )}
          >
            {title}
          </label>
        </div>
        {hasError && (
          <p id={errorId} className={'mt-1 px-4 text-body-sm text-error'}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputForm.displayName = 'InputForm';

export default InputForm;
