import type { Metadata } from "next"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogLayout } from "@/components/blog/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllPosts, getFeaturedPost, getCategories, getPopularPosts } from "@/lib/blog/blog-service"

export const metadata: Metadata = {
  title: "Blog - QuoteLinker",
  description: "Educational resources and articles about insurance coverage and financial protection",
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const regularPosts = featuredPost ? allPosts.filter((post) => post.slug !== featuredPost.slug) : allPosts

  const categories = getCategories()
  const popularPosts = getPopularPosts()

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Insurance Blog</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Educational resources and articles about insurance coverage and financial protection
        </p>
      </div>

      {featuredPost && (
        <div className="mt-12">
          <BlogCard post={featuredPost} />
        </div>
      )}

      <BlogLayout sidebar={<BlogSidebar categories={categories} popularPosts={popularPosts} showLeadMagnet={true} />}>
        <div className="grid gap-8 sm:grid-cols-2">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </BlogLayout>
    </div>
  )
}

