"use server"

import { createClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email/email-service"
import { generateConsumerConfirmationEmail } from "@/lib/email/templates/consumer-confirmation"
import { generateAgentNotificationEmail } from "@/lib/email/templates/agent-notification"

export async function sendLeadConfirmationEmail(leadData: {
  full_name: string
  email: string
  phone: string
  zip_code: string
  insurance_type: string
}) {
  try {
    const { email, full_name } = leadData

    if (!email || !full_name) {
      console.error("Missing required data for confirmation email")
      return { success: false, error: "Missing required data" }
    }

    // Check if email environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration is incomplete. Please check environment variables.")
      return { success: false, error: "Email configuration is incomplete" }
    }

    const htmlContent = generateConsumerConfirmationEmail({
      fullName: leadData.full_name,
      email: leadData.email,
      phone: leadData.phone,
      zipCode: leadData.zip_code,
      insuranceType: leadData.insurance_type,
    })

    const result = await sendEmail({
      to: email,
      subject: "Thank You for Your Life Insurance Quote Request",
      html: htmlContent,
    })

    if (!result.success) {
      console.error("Failed to send confirmation email:", result.error)
    }

    return result
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendAgentLeadNotificationEmail(leadId: string, agentId: string) {
  try {
    const supabase = createClient()

    // Get lead data
    const { data: lead, error: leadError } = await supabase.from("leads").select("*").eq("id", leadId).single()

    if (leadError || !lead) {
      console.error("Lead not found:", leadError)
      return { success: false, error: "Lead not found" }
    }

    // Get agent data
    const { data: agent, error: agentError } = await supabase
      .from("agent_profiles")
      .select("email")
      .eq("id", agentId)
      .single()

    if (agentError || !agent || !agent.email) {
      console.error("Agent not found:", agentError)
      return { success: false, error: "Agent not found" }
    }

    // Check if email environment variables are set
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration is incomplete. Please check environment variables.")
      return { success: false, error: "Email configuration is incomplete" }
    }

    const htmlContent = generateAgentNotificationEmail(lead)

    const result = await sendEmail({
      to: agent.email,
      subject: "New Lead Assigned - QuoteLinker",
      html: htmlContent,
    })

    if (!result.success) {
      console.error("Failed to send agent notification email:", result.error)
    }

    return result
  } catch (error) {
    console.error("Error sending agent notification email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

