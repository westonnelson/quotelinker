import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Category {
  name: string
  slug: string
  count: number
}

interface PopularPost {
  title: string
  slug: string
  date: string
}

interface BlogSidebarProps {
  categories?: Category[]
  popularPosts?: PopularPost[]
  showLeadMagnet?: boolean
}

export function BlogSidebar({ categories, popularPosts, showLeadMagnet = true }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      {showLeadMagnet && (
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Free Insurance Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Download our free guide to understanding insurance coverage and finding the best rates.
            </p>
            <Link
              href="/resources/insurance-guide"
              className="inline-block rounded bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90"
            >
              Download Now
            </Link>
          </CardContent>
        </Card>
      )}

      {categories && categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link key={category.slug} href={`/blog/category/${category.slug}`}>
                  <Badge variant="outline" className="hover:bg-muted">
                    {category.name} ({category.count})
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {popularPosts && popularPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <h3 className="font-medium group-hover:text-primary line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

