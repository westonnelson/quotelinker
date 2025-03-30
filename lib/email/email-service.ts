import nodemailer from "nodemailer"

// Email configuration
const getEmailConfig = () => {
  // Check if required environment variables are set
  const requiredVars = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS", "EMAIL_FROM"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error(`Missing required email environment variables: ${missingVars.join(", ")}`)
    throw new Error(`Missing required email environment variables: ${missingVars.join(", ")}`)
  }

  return {
    host: process.env.EMAIL_HOST || "smtp.resend.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER || "apikey",
      pass: process.env.EMAIL_PASS || "",
    },
  }
}

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (!transporter) {
    try {
      const config = getEmailConfig()
      transporter = nodemailer.createTransport(config)
    } catch (error) {
      console.error("Failed to create email transporter:", error)
      throw error
    }
  }
  return transporter
}

// Verify connection configuration
export async function verifyEmailConfig() {
  try {
    const transport = getTransporter()
    await transport.verify()
    console.log("Email service is ready to send messages")
    return true
  } catch (error) {
    console.error("Email service configuration error:", error)
    return false
  }
}

// Send email function
export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || "support@quotelinker.com",
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  try {
    const transport = getTransporter()
    const info = await transport.sendMail({
      from,
      to,
      subject,
      html,
    })

    console.log("Message sent: %s", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

