import type { ReactNode } from "react"

interface BlogLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
}

export function BlogLayout({ children, sidebar }: BlogLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">{children}</div>
        {sidebar && <aside className="md:col-span-1">{sidebar}</aside>}
      </div>
    </div>
  )
}

