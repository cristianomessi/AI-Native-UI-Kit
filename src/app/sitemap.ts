import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

const base = 'https://ai-native-ui.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `${base}${page.url}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    ...docs,
  ];
}
