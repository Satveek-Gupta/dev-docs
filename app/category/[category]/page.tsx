import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocsByCategory, getAllDocs } from '@/lib/content'
import { CATEGORIES } from '@/types'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { CategoryPageContent } from '@/components/category/CategoryPageContent'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) return {}
  return {
    title: `${cat.name} Documentation`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const docs = getDocsByCategory(category)
  const allDocs = getAllDocs()

  const sidebarDocs = allDocs.map((d) => ({
    title: d.title,
    slugAsParams: d.slugAsParams,
    category: d.category,
  }))

  return (
    <DocsLayout docs={sidebarDocs}>
      <CategoryPageContent cat={cat} docs={docs} />
    </DocsLayout>
  )
}
