import type { Metadata } from "next"
import InsuranceGuideClientPage from "./InsuranceGuideClientPage"

export const metadata: Metadata = {
  title: "The Ultimate Insurance Guide - QuoteLinker",
  description: "Download our free comprehensive guide to understanding insurance coverage and finding the best rates",
}

export default function InsuranceGuidePage() {
  return <InsuranceGuideClientPage />
}

