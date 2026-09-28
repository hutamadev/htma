import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hutama Portfolio',
    short_name: 'htma',
    description: 'Hutama - Web Developer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcfa',
    theme_color: '#526600',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
