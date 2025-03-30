export interface BlogAuthor {
  name: string
  avatar?: string
  bio?: string
}

export interface BlogPostMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  coverImage?: string
  readingTime?: string
  featured?: boolean
  author?: BlogAuthor
  content: string
  meta: BlogPostMeta
  relatedPosts?: string[]
}

