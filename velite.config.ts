import { defineConfig, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

// Simple rehype plugin to extract code metadata (like title="..." or inline options)
const rehypeCodeMeta = () => (tree: any) => {
  function walk(node: any) {
    if (!node) return
    if (node.type === 'element' && node.tagName === 'code' && node.data?.meta) {
      node.properties = node.properties || {}
      node.properties.metastring = node.data.meta
      
      const titleMatch = node.data.meta.match(/title=(["'])(.*?)\1/)
      if (titleMatch) {
        node.properties.title = titleMatch[2]
      } else {
        const words = node.data.meta.split(/\s+/)
        const firstWord = words.find((w: string) => w && !w.startsWith('{') && !w.includes('='))
        if (firstWord) {
          node.properties.title = firstWord
        }
      }
    }
    if (node.children) {
      node.children.forEach(walk)
    }
  }
  walk(tree)
}

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    docs: {
      name: 'Doc',
      pattern: '**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          description: s.string().max(999).optional(),
          slug: s.path(),
          category: s.string(),
          tags: s.array(s.string()).default([]),
          publishedAt: s.isodate(),
          updatedAt: s.isodate().optional(),
          featured: s.boolean().default(false),
          author: s.string().default('Satveek Gupta'),
          readingTime: s.number().optional(),
          coverImage: s.string().optional(),
          template: s.boolean().default(false),
          draft: s.boolean().default(false),
          toc: s.toc(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          slugAsParams: data.slug,
        })),
    },
  },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeCodeMeta,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
