import { getAllDocs } from '@/lib/content'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const docs = getAllDocs()

  const docUrls = docs.map((doc) => ({
    url: `${siteUrl}/docs/${doc.slugAsParams}`,
    lastModified: new Date(doc.updatedAt ?? doc.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: doc.featured ? 0.9 : 0.7,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...docUrls,
  ]
}
