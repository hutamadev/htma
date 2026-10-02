import clsx from 'clsx';
import type { Metadata } from 'next';

import Layout from '@components/layout/layout-wrapper';

import { googleSansFlex } from '@utils/localFont';
import { ThemeProvider } from '@utils/theme-provider';

import '@styles/globals.css';

export const metadata: Metadata = {
  // pi-lens-ignore: unchecked-throwing-call-js -- argument is a compile-time string literal, so it cannot be malformed at runtime; `metadataBase` is typed `URL` (not string), and wrapping it in try/catch would make it possibly-undefined, silently degrading canonical/OG URLs to relative instead of failing the build loudly on a typo.
  metadataBase: new URL('https://htma.my.id'),
  title: {
    default: 'Hutama — Web Developer',
    template: '%s | Hutama — Web Developer',
  },
  description:
    'Personal portfolio of Hutama, a Web Developer crafting high-performance, modern web applications with React, Next.js, and TypeScript.',
  applicationName: 'Hutama Portfolio',
  authors: [{ name: 'Hutama', url: 'https://htma.my.id' }],
  creator: 'Hutama',
  keywords: [
    'Hutama',
    'hutamadev',
    'Web Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Material 3 Expressive',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://htma.my.id',
    title: 'Hutama — Web Developer',
    description:
      'Personal portfolio of Hutama, a Web Developer crafting high-performance, modern web applications with React, Next.js, and TypeScript.',
    siteName: 'Hutama',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hutama — Web Developer',
    description:
      'Personal portfolio of Hutama, a Web Developer crafting high-performance, modern web applications with React, Next.js, and TypeScript.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://htma.my.id/#person',
      name: 'Hutama',
      url: 'https://htma.my.id',
      jobTitle: 'Web Developer',
      sameAs: ['https://github.com/hutamadev'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://htma.my.id/#website',
      url: 'https://htma.my.id',
      name: 'Hutama — Web Developer Portfolio',
      description:
        'Personal portfolio of Hutama, a Web Developer crafting high-performance, modern web applications with React, Next.js, and TypeScript.',
      publisher: {
        '@id': 'https://htma.my.id/#person',
      },
    },
  ],
};

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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div id='modal-card'></div>
        <div id='modal-backdrop'></div>
        <ThemeProvider
          attribute='class'
          storageKey='htma-theme'
          defaultTheme='dark'
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
