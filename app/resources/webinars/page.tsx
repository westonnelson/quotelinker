import type { Metadata } from "next"
import Link from "next/link"
import { VideoEmbed } from "@/components/multimedia/video-embed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Insurance Webinars - QuoteLinker",
  description: "Watch our educational webinars about insurance coverage and financial protection",
}

// This would typically come from a CMS or database
const webinars = [
  {
    id: "understanding-life-insurance",
    title: "Understanding Life Insurance Options",
    description:
      "Learn about the different types of life insurance and how to choose the right coverage for your needs.",
    date: "2023-06-15",
    duration: "45 minutes",
    presenter: "Sarah Johnson, CFP",
    category: "Life Insurance",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual webinar URL
    thumbnail: "/placeholder.svg?height=200&width=400",
    featured: true,
    registrationRequired: false,
  },
  {
    id: "home-insurance-101",
    title: "Home Insurance 101: Protecting Your Investment",
    description:
      "A comprehensive overview of homeowners insurance coverage and how to ensure your home is properly protected.",
    date: "2023-07-22",
    duration: "60 minutes",
    presenter: "Michael Rodriguez, Insurance Specialist",
    category: "Home Insurance",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual webinar URL
    thumbnail: "/placeholder.svg?height=200&width=400",
    registrationRequired: false,
  },
  {
    id: "auto-insurance-savings",
    title: "Auto Insurance: How to Save Without Sacrificing Coverage",
    description: "Tips and strategies for reducing your auto insurance premiums while maintaining adequate coverage.",
    date: "2023-08-10",
    duration: "50 minutes",
    presenter: "Jennifer Lee, Insurance Agent",
    category: "Auto Insurance",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual webinar URL
    thumbnail: "/placeholder.svg?height=200&width=400",
    registrationRequired: false,
  },
  {
    id: "health-insurance-explained",
    title: "Health Insurance Explained: Navigating Your Options",
    description:
      "A guide to understanding health insurance plans, coverage options, and how to choose the right plan for you and your family.",
    date: "2023-09-05",
    time: "2:00 PM EST",
    duration: "60 minutes",
    presenter: "Dr. Robert Smith, Healthcare Consultant",
    category: "Health Insurance",
    registrationUrl: "/resources/webinars/register/health-insurance-explained",
    thumbnail: "/placeholder.svg?height=200&width=400",
    registrationRequired: true,
    upcoming: true,
  },
]

export default function WebinarsPage() {
  const featuredWebinar = webinars.find((webinar) => webinar.featured)
  const pastWebinars = webinars.filter((webinar) => !webinar.upcoming && !webinar.featured)
  const upcomingWebinars = webinars.filter((webinar) => webinar.upcoming)

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Insurance Webinars</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Educational webinars to help you understand insurance coverage and make informed decisions
        </p>
      </div>

      {featuredWebinar && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Featured Webinar</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <VideoEmbed src={featuredWebinar.videoUrl} title={featuredWebinar.title} type="webinar" />
            <div className="space-y-4">
              <Badge>{featuredWebinar.category}</Badge>
              <h3 className="text-2xl font-bold">{featuredWebinar.title}</h3>
              <p className="text-muted-foreground">{featuredWebinar.description}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Recorded: {new Date(featuredWebinar.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Duration: {featuredWebinar.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Presenter: {featuredWebinar.presenter}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href={`/resources/webinars/${featuredWebinar.id}`}>
                  <Button>Watch Full Webinar</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {upcomingWebinars.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Upcoming Webinars</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingWebinars.map((webinar) => (
              <Card key={webinar.id} className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="mb-2">
                    <Badge variant="outline">{webinar.category}</Badge>
                  </div>
                  <CardTitle>{webinar.title}</CardTitle>
                  <CardDescription>{webinar.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(webinar.date).toLocaleDateString()}</span>
                    </div>
                    {webinar.time && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{webinar.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Duration: {webinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Presenter: {webinar.presenter}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={webinar.registrationUrl || `/resources/webinars/register/${webinar.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">Register Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Past Webinars</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pastWebinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-col">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={webinar.thumbnail || "/placeholder.svg"}
                  alt={webinar.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Link href={`/resources/webinars/${webinar.id}`}>
                    <Button variant="secondary">Watch Now</Button>
                  </Link>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="mb-1">
                  <Badge variant="outline">{webinar.category}</Badge>
                </div>
                <CardTitle className="text-lg">{webinar.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(webinar.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{webinar.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/resources/webinars/${webinar.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Webinar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

