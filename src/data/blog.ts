import raw from './blog.json'

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'quote'; text: string; attribution: string }

export type BlogPost = {
  slug: string
  title: string
  author: string
  authorTitle?: string
  date: string
  excerpt: string
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = raw as BlogPost[]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
