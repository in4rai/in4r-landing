import './globals.css';
import type { Metadata } from 'next';
import { inter, satoshi, ibmPlexMono } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'in4r.ai - Autonomous Tools for Scientific Thinking',
  description: 'Innovative AI solutions for scientific research, literature analysis, and inference chains.',
  keywords: 'AI, scientific research, autonomous tools, literature agent, inference chains, API bridges',
  openGraph: {
    title: 'in4r.ai - Autonomous Tools for Scientific Thinking',
    description: 'Innovative AI solutions for scientific research, literature analysis, and inference chains.',
    url: 'https://in4r.ai',
    siteName: 'in4r.ai',
    images: [
      {
        url: 'https://in4r.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'in4r.ai - Autonomous Tools for Scientific Thinking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'in4r.ai - Autonomous Tools for Scientific Thinking',
    description: 'Innovative AI solutions for scientific research, literature analysis, and inference chains.',
    images: ['https://in4r.ai/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-bg-main text-text-main font-inter">
        {children}
      </body>
    </html>
  );
}