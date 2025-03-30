import { LeadManagementDemo } from "@/components/lead-management"

export default function StorageDemoPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Storage Functionality Demo</h1>
          <p className="text-muted-foreground mt-2">
            This page demonstrates the CRUD operations for leads, notes, and documents.
          </p>
        </div>

        <LeadManagementDemo />
      </div>
    </div>
  )
}

