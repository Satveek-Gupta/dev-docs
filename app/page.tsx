import type { Metadata } from 'next'
import { getAllDocs, getFeaturedDocs, getRecentDocs, getAllTags } from '@/lib/content'
import { CATEGORIES } from '@/types'
import { HeroSection, HomepageContent } from '@/components/home/HomepageContent'
import { TopNav } from '@/components/layout/TopNav'

export const metadata: Metadata = {
  title: 'OpsForge — Cloud & DevOps Knowledge Base',
  description: 'Production-ready guides, templates, and infrastructure documentation for cloud engineering.',
}

export default function HomePage() {
  const featured = getFeaturedDocs(4)
  const recent = getRecentDocs(6)
  const tags = getAllTags().slice(0, 24)
  const allDocs = getAllDocs()

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    count: allDocs.filter((d) => d.category.toLowerCase() === cat.slug).length,
  })).filter((c) => c.count > 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <TopNav />
      <HeroSection docCount={allDocs.length} categoryCount={categoriesWithCount.length} />
      <HomepageContent
        featured={featured}
        recent={recent}
        tags={tags}
        categories={categoriesWithCount}
      />
    </div>
  )
}
