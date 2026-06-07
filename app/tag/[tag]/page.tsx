import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocsByTag, getAllTags, getAllDocs } from '@/lib/content'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <TopNav />
      <div style={{ display: 'flex', paddingTop: 'var(--nav-height)', maxWidth: '1400px', margin: '0 auto' }}>
        <Sidebar docs={sidebarDocs} />
        <TagPageContent tag={tag} docs={docs} />
      </div>
    </div>
  )
}
