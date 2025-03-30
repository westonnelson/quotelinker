import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { VideoEmbed } from "@/components/multimedia/video-embed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Download } from "lucide-react"

interface WebinarPageProps {
  params: {
    id: string
  }
}

// This would typically come from a CMS or database
const webinars = [
  {
    id: "understanding-life-insurance",
    title: "Understanding Life Insurance Options",
    description:
      "Learn about the different types of life insurance and how to choose the right coverage for your needs.",
    longDescription: `
      <p>Life insurance is an essential part of financial planning, but understanding the different options can be overwhelming. In this webinar, our expert Sarah Johnson breaks down the various types of life insurance policies and helps you determine which one is right for your specific situation.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>The differences between term, whole, universal, and variable life insurance</li>
        <li>How to calculate how much coverage you need</li>
        <li>When to consider purchasing life insurance</li>
        <li>Common riders and policy features to consider</li>
        <li>Tips for finding the best rates</li>
      </ul>
      
      <p>Whether you're just starting to explore life insurance options or looking to update your existing coverage, this webinar provides valuable insights to help you make informed decisions about protecting your family's financial future.</p>
    `,
    date: "2023-06-15",
    duration: "45 minutes",
    presenter: "Sarah Johnson, CFP",
    presenterBio:
      "Sarah Johnson is a Certified Financial Planner with over 15 years of experience in the insurance industry. She specializes in helping families find the right life insurance coverage for their needs and budget.",
    category: "Life Insurance",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replace with actual webinar URL
    thumbnail: "/placeholder.svg?height=400&width=800",
    featured: true,
    registrationRequired: false,
    resources: [
      {
        name: "Life Insurance Comparison Chart",
        description: "A detailed comparison of different life insurance policies",
        url: "/resources/life-insurance-comparison.pdf",
      },
      {
        name: "Coverage Calculator Worksheet",
        description: "Worksheet to help determine how much coverage you need",
        url: "/resources/coverage-calculator.pdf",
      },
    ],
    relatedWebinars: ["life-insurance-for-business-owners", "estate-planning-basics"],
  },
  // Add more webinars as needed
]

export function generateMetadata({ params }: WebinarPageProps): Metadata {
  const webinar = webinars.find((w) => w.id === params.id)

  if (!webinar) {
    return {
      title: "Webinar Not Found - QuoteLinker",
      description: "The requested webinar could not be found.",
    }
  }

  return {
    title: `${webinar.title} - QuoteLinker Webinars`,
    description: webinar.description,
  }
}

export default function WebinarPage({ params }: WebinarPageProps) {
  const webinar = webinars.find((w) => w.id === params.id)

  if (!webinar) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <Link href="/resources/webinars" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
        ← Back to Webinars
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Badge>{webinar.category}</Badge>
            <h1 className="text-3xl font-bold mt-2">{webinar.title}</h1>
            <p className="text-muted-foreground mt-2">{webinar.description}</p>
          </div>

          <VideoEmbed
            src={webinar.videoUrl}
            title={webinar.title}
            type="youtube"
            className="rounded-lg overflow-hidden"
          />

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: webinar.longDescription }} />
          </div>

          {webinar.resources && webinar.resources.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {webinar.resources.map((resource, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <Download className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <Link href={resource.url} className="text-sm text-primary hover:underline mt-1 inline-block">
                          Download
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Webinar Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(webinar.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{webinar.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Presenter</p>
                    <p className="text-sm text-muted-foreground">{webinar.presenter}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">About the Presenter</h2>
              <p className="text-sm text-muted-foreground">{webinar.presenterBio}</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">Get Personalized Advice</h2>
              <p className="mb-4">Speak with a licensed insurance agent about your specific coverage needs.</p>
              <Link href={`/insurance/${webinar.category.toLowerCase().replace(" ", "-")}`}>
                <Button variant="secondary" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

