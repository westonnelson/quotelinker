import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { getDefaultImageUrl } from "@/lib/blog-utils"

interface BlogHeroProps {
  title: string
  excerpt?: string
  date: string
  category: string
  author?: {
    name: string
    avatar?: string
  }
  coverImage?: string
  readingTime?: string
  featured?: boolean
}

export function BlogHero({ title, excerpt, date, category, author, coverImage, readingTime, featured }: BlogHeroProps) {
  // Use provided image or default based on category
  const imageUrl = coverImage || getDefaultImageUrl(category)

  return (
    <div className="mx-auto max-w-4xl py-6 md:py-12">
      <div className="space-y-4 text-center">
        <div className="flex justify-center gap-2">
          <Badge variant="outline">{category}</Badge>
          {featured && <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Featured</Badge>}
        </div>
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{title}</h1>
        {excerpt && <p className="text-xl text-muted-foreground">{excerpt}</p>}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar && (
                <img
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span>{author.name}</span>
            </div>
          )}
          <time dateTime={date}>{formatDate(date)}</time>
          {readingTime && <span>{readingTime}</span>}
        </div>
      </div>
      {imageUrl && (
        <div className="mt-8">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="aspect-video w-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  )
}

