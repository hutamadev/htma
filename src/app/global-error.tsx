'use client';

import { useEffect } from 'react';

/*
 * `global-error` replaces the root layout, and Next.js does not load the app's
 * global stylesheet into it — so Tailwind utilities, the `--color-*` theme and
 * the class-based theme toggle from `globals.css` are all unavailable here.
 * Every style below is therefore self-contained and keyed off
 * `prefers-color-scheme` instead of the `.dark` class.
 * Ref: https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error
 *
 * Values mirror the M3 roles in `globals.css` (surface, on-surface,
 * on-surface-variant, plus the dark-box/lime-fill accent pair used by the
 * navbar logo and the error-page buttons, expressed here as `--ge-accent-*`).
 */
const globalErrorStyles = `
  :root {
    color-scheme: light dark;
    --ge-surface: #fdfcfa;
    --ge-on-surface: #1b1c17;
    --ge-on-surface-variant: #46483c;
    --ge-accent-surface: #1b1c17;
    --ge-on-accent-surface: #d0ef67;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --ge-surface: #1b1c17;
      --ge-on-surface: #e4e3da;
      --ge-on-surface-variant: #c7c8b8;
      --ge-accent-surface: #b4d34e;
      --ge-on-accent-surface: #1b1c17;
    }
  }

  body.global-error {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 1rem;
    background-color: var(--ge-surface);
    color: var(--ge-on-surface);
    font-family:
      'Google Sans Flex', 'Google Sans Text', system-ui, -apple-system, sans-serif;
  }

  .global-error__content {
    display: flex;
    max-width: 28rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  .global-error__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .global-error__message {
    margin: 0;
    font-size: 0.875rem;
    color: var(--ge-on-surface-variant);
  }

  .global-error__retry {
    border: 0;
    border-radius: 28px;
    background-color: var(--ge-accent-surface);
    padding: 0.625rem 1.5rem;
    color: var(--ge-on-accent-surface);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  .global-error__retry:hover {
    opacity: 0.9;
  }
`;

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang='en'>
      <head>
        <style>{globalErrorStyles}</style>
      </head>
      <body className='global-error'>
        <div className='global-error__content'>
          <h2 className='global-error__title'>Something went wrong!</h2>
          <p className='global-error__message'>
            A critical error occurred. Please try reloading the page.
          </p>
          <button className='global-error__retry' onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
