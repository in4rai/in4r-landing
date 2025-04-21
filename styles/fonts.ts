import { Inter, IBM_Plex_Mono, Outfit } from 'next/font/google';

// Define the fonts
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Replace Satoshi with Outfit (a modern, clean sans-serif from Google Fonts)
export const satoshi = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satoshi',
});

// Use IBM Plex Mono from Google Fonts instead of local files
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});