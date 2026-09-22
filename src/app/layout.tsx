import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

import Layout from '@components/layout/layout-wrapper';

import { googleSansFlex } from '@utils/localFont';
import { ThemeProvider } from '@utils/theme-provider';

import '@styles/globals.css';

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html
      lang='en'
      className={clsx(googleSansFlex.variable, 'antialiased')}
      suppressHydrationWarning
    >
      <body className='bg-surface font-sans text-on-surface'>
        <div id='modal-card'></div>
        <div id='modal-backdrop'></div>
        <div id='modal-close'></div>
        <ThemeProvider
          attribute='class'
          storageKey='htma-theme'
          defaultTheme='light'
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
