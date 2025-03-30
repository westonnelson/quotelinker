import { Heart, Car, Home, Stethoscope, FileText } from "lucide-react"

// Map insurance categories to their respective icons
export const getCategoryIcon = (category: string) => {
  const categoryMap: Record<string, any> = {
    "Life Insurance": Heart,
    "Auto Insurance": Car,
    "Home Insurance": Home,
    "Health Insurance": Stethoscope,
    General: FileText,
  }

  return categoryMap[category] || FileText
}

// Get default image URL based on category
export const getDefaultImageUrl = (category: string) => {
  const categoryImageMap: Record<string, string> = {
    "Life Insurance": "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop",
    "Auto Insurance": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    "Home Insurance": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    "Health Insurance": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
    General: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
  }

  return categoryImageMap[category] || categoryImageMap["General"]
}

