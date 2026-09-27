import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'تن‌وا - کالری‌شمار هوشمند',
    short_name: 'تن‌وا',
    description: 'اپلیکیشن کالری‌شمار هوشمند تن‌وا',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#059669',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icons/tanva-icon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/tanva-icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/tanva-icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}