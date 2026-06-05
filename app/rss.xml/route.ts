import { getAllDocs } from '@/lib/content'
import { NextResponse } from 'next/server'

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Cloud & DevOps Knowledge Base'
  const docs = getAllDocs().slice(0, 20)

  const items = docs
    .map(
      (doc) => `
    <item>
      <title><![CDATA[${doc.title}]]></title>
      <description><![CDATA[${doc.description ?? doc.excerpt ?? ''}]]></description>
      <link>${siteUrl}/docs/${doc.slugAsParams}</link>
      <guid isPermaLink="true">${siteUrl}/docs/${doc.slugAsParams}</guid>
      <pubDate>${new Date(doc.publishedAt).toUTCString()}</pubDate>
      <category>${doc.category}</category>
      ${doc.tags.map((t) => `<category>${t}</category>`).join('\n      ')}
    </item>`
    )
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>Production-ready cloud &amp; DevOps documentation</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
