import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { getDefaultImageUrl, getCategoryIcon } from "@/lib/blog-utils"

interface BlogCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
    coverImage?: string
    readingTime?: string
    featured?: boolean
  }
}

export function BlogCard({ post }: BlogCardProps) {
  // Get the appropriate icon based on category
  const CategoryIcon = getCategoryIcon(post.category)

  // Use provided image or default based on category
  const imageUrl = post.coverImage || getDefaultImageUrl(post.category)

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={post.title}
          width={400}
          height={200}
          className="w-full aspect-[2/1] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Add category icon overlay in the corner */}
        <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-black/60 p-1.5 rounded-full">
          <CategoryIcon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            {post.category}
          </Badge>
          {post.featured && (
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-normal">Featured</Badge>
          )}
        </div>
        <h3 className="text-xl font-bold group-hover:text-primary line-clamp-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

