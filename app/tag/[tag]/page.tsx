import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocsByTag, getAllTags, getAllDocs } from '@/lib/content'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { TagPageContent } from '@/components/tag/TagPageContent'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `#${tag} — OpsForge`,
    description: `All articles tagged with #${tag}`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const docs = getDocsByTag(tag)
  if (!docs.length) notFound()

  const allDocs = getAllDocs()
  const sidebarDocs = allDocs.map((d) => ({
    title: d.title,
    slugAsParams: d.slugAsParams,
    category: d.category,
  }))

  return (
    <DocsLayout docs={sidebarDocs}>
      <TagPageContent tag={tag} docs={docs} />
    </DocsLayout>
  )
}
