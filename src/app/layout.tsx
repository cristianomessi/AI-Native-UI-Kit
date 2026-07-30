import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
});

const description =
  'Composable, accessible React components for building AI-native interfaces — chat inputs, prompt composers, and agent UI. Copy-paste or install via the shadcn CLI.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-native-ui.com'),
  title: {
    default: `${appName} — components for AI-native apps`,
    template: `%s — ${appName}`,
  },
  description,
  applicationName: appName,
  authors: [{ name: 'Balram Ravi', url: 'https://balramravi.com' }],
  creator: 'Balram Ravi',
  keywords: [
    'AI UI components',
    'AI native UI',
    'React AI components',
    'shadcn registry',
    'prompt composer',
    'chatbot UI',
    'AI SDK',
    'LLM interface components',
    'AI UX patterns',
    'Next.js AI components',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://ai-native-ui.com',
    siteName: appName,
    title: `${appName} — components for AI-native apps`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName} — components for AI-native apps`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: appName,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description,
  url: 'https://ai-native-ui.com',
  author: { '@type': 'Person', name: 'Balram Ravi', url: 'https://balramravi.com' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ options: { type: 'static' } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
