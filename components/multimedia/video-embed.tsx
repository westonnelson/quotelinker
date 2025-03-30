"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface VideoEmbedProps {
  src: string
  title: string
  width?: number | string
  height?: number | string
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  poster?: string
  className?: string
  type?: "youtube" | "vimeo" | "mp4" | "webinar"
  startTime?: number // in seconds
}

export function VideoEmbed({
  src,
  title,
  width = "100%",
  height = "auto",
  autoPlay = false,
  muted = false,
  controls = true,
  loop = false,
  poster,
  className,
  type = "youtube",
  startTime = 0,
}: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("16/9")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // If it's an MP4 video and we have a start time, set the current time
    if (type === "mp4" && startTime > 0 && videoRef.current) {
      videoRef.current.currentTime = startTime
    }
  }, [type, startTime])

  // Process YouTube URL to include autoplay, muted, etc.
  const getYouTubeUrl = () => {
    // Extract video ID from various YouTube URL formats
    let videoId = ""
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = src.match(youtubeRegex)

    if (match && match[1]) {
      videoId = match[1]
    } else {
      // If no match, assume the src is already a video ID
      videoId = src
    }

    const params = new URLSearchParams()
    if (autoPlay) params.append("autoplay", "1")
    if (muted) params.append("mute", "1")
    if (controls) params.append("controls", "1")
    if (loop) params.append("loop", "1")
    if (startTime > 0) params.append("start", startTime.toString())

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  // Process Vimeo URL
  const getVimeoUrl = () => {
    // Extract video ID from Vimeo URL
    let videoId = ""
    const vimeoRegex =
      /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/\d+\/video\/|)(\d+)(?:$|\/|\?))/
    const match = src.match(vimeoRegex)

    if (match && match[1]) {
      videoId = match[1]
    } else {
      // If no match, assume the src is already a video ID
      videoId = src
    }

    const params = new URLSearchParams()
    if (autoPlay) params.append("autoplay", "1")
    if (muted) params.append("muted", "1")
    if (!controls) params.append("controls", "0")
    if (loop) params.append("loop", "1")
    if (startTime > 0) params.append("t", startTime.toString())

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
  }

  // Render different video types
  const renderVideo = () => {
    switch (type) {
      case "youtube":
        return (
          <iframe
            src={getYouTubeUrl()}
            title={title}
            width={width}
            height={height}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-md"
          />
        )
      case "vimeo":
        return (
          <iframe
            src={getVimeoUrl()}
            title={title}
            width={width}
            height={height}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-md"
          />
        )
      case "mp4":
        return (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            width={width}
            height={height}
            autoPlay={autoPlay}
            muted={muted}
            controls={controls}
            loop={loop}
            className="absolute top-0 left-0 w-full h-full rounded-md"
          />
        )
      case "webinar":
        // For webinars, we'll use a more styled container with additional info
        return (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col">
            <iframe
              src={getYouTubeUrl()}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="flex-1 w-full rounded-t-md"
            />
            <div className="bg-card p-4 rounded-b-md">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Join our expert webinar to learn more about insurance options
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div
          className="relative w-full"
          style={{
            paddingBottom: type === "webinar" ? "calc(56.25% + 80px)" : "56.25%", // 16:9 aspect ratio + space for webinar info
            backgroundColor: "#000",
          }}
        >
          {isLoaded && renderVideo()}
        </div>
      </CardContent>
    </Card>
  )
}

