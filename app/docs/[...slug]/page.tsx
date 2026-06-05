import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllDocs, getDocBySlug, getRelatedDocs, getPrevNext } from '@/lib/content'
import { CATEGORIES } from '@/types'
import { getCategoryColor, formatDate } from '@/lib/utils'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { TableOfContents } from '@/components/toc/TableOfContents'
import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { PrevNext } from '@/components/docs/PrevNext'
import { ReadingProgress } from '@/components/docs/ReadingProgress'
import { MDXContent } from '@/components/mdx/MDXContent'
import { DocHeader } from '@/components/docs/DocHeader'
import { RelatedArticles } from '@/components/docs/RelatedArticles'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const slugParam = slug.join('/')
  const doc = getDocBySlug(slugParam)
  if (!doc) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      publishedTime: doc.publishedAt,
      modifiedTime: doc.updatedAt,
      tags: doc.tags,
      url: `${siteUrl}/docs/${doc.slugAsParams}`,
    },
    twitter: { card: 'summary_large_image', title: doc.title, description: doc.description },
  }
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const slugParam = slug.join('/')
  const doc = getDocBySlug(slugParam)

  if (!doc) notFound()

  const allDocs = getAllDocs()
  const related = getRelatedDocs(doc, 3)
  const { prev, next } = getPrevNext(doc)
  const catMeta = CATEGORIES.find((c) => c.slug === doc.category.toLowerCase())

  const sidebarDocs = allDocs.map((d) => ({
    title: d.title,
    slugAsParams: d.slugAsParams,
    category: d.category,
  }))

  const toc = doc.toc ?? []

  return (
    <>
      <ReadingProgress />
      <DocsLayout
        docs={sidebarDocs}
        toc={toc.length > 0 ? <TableOfContents toc={toc} /> : undefined}
      >
        <Breadcrumbs
          items={[
            { label: catMeta?.name ?? doc.category, href: `/category/${doc.category.toLowerCase()}` },
            { label: doc.title },
          ]}
        />

        <DocHeader doc={doc} catMeta={catMeta} />

        {/* MDX Content rendered from Velite's compiled output */}
        <article
          style={{
            maxWidth: '72ch',
            color: 'var(--text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: '1.8',
          }}
        >
          <MDXContent code={doc.content} />
        </article>

        <PrevNext prev={prev} next={next} />
        <RelatedArticles related={related} />
      </DocsLayout>
    </>
  )
}
