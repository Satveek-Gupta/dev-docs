export interface DocMeta {
  title: string
  description?: string
  slug: string
  slugAsParams: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt?: string
  featured: boolean
  author: string
  readingTime?: number
  coverImage?: string
  template: boolean
  draft: boolean
  excerpt?: string
}

export interface Doc extends DocMeta {
  content: string
  toc: TocEntry[]
}

export interface TocEntry {
  title: string
  url: string
  items?: TocEntry[]
}

export interface SearchResult {
  title: string
  slug: string
  category: string
  description?: string
  tags: string[]
  excerpt?: string
}

export interface CategoryMeta {
  name: string
  slug: string
  description: string
  icon: string
  color: string
  count?: number
}

export const CATEGORIES: CategoryMeta[] = [
  { name: 'AWS', slug: 'aws', description: 'Amazon Web Services guides and tutorials', icon: '☁️', color: '#ff9900' },
  { name: 'Docker', slug: 'docker', description: 'Containerization with Docker', icon: '🐳', color: '#2496ed' },
  { name: 'Kubernetes', slug: 'kubernetes', description: 'Container orchestration at scale', icon: '⚙️', color: '#326ce5' },
  { name: 'Linux', slug: 'linux', description: 'Linux system administration', icon: '🐧', color: '#f5a623' },
  { name: 'Terraform', slug: 'terraform', description: 'Infrastructure as Code with Terraform', icon: '🏗️', color: '#7b42bc' },
  { name: 'DevOps', slug: 'devops', description: 'DevOps practices and culture', icon: '🔄', color: '#22c55e' },
  { name: 'CI/CD', slug: 'cicd', description: 'Continuous Integration & Delivery', icon: '🚀', color: '#f97316' },
  { name: 'Networking', slug: 'networking', description: 'Cloud and system networking', icon: '🌐', color: '#06b6d4' },
  { name: 'Cloud', slug: 'cloud', description: 'Cloud architecture patterns', icon: '⛅', color: '#00d4ff' },
  { name: 'Security', slug: 'security', description: 'Cloud and system security', icon: '🔒', color: '#ef4444' },
  { name: 'SysAdmin', slug: 'sysadmin', description: 'System administration notes', icon: '🖥️', color: '#8b5cf6' },
  { name: 'Misc', slug: 'misc', description: 'Miscellaneous technical content', icon: '📚', color: '#6b7280' },
]
