import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  textClassName?: string
  iconClassName?: string
  showText?: boolean
}

export function Logo({ className, textClassName, iconClassName, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center rounded-md bg-primary p-1.5">
        <LinkIcon className={cn("h-5 w-5 text-white", iconClassName)} aria-hidden="true" />
      </div>
      {showText && <span className={cn("text-xl font-bold", textClassName)}>QuoteLinker</span>}
    </Link>
  )
}

