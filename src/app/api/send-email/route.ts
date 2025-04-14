import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    const { data, error } = await resend.emails.send({
      from: 'support@quotelinker.com',
      to: formData.email,
      subject: 'Your Life Insurance Quote Request',
      html: `
        <h1>Thank you for your quote request!</h1>
        <p>We've received your information and our team will review it shortly.</p>
        <h2>Your Details:</h2>
        <ul>
          <li>Name: ${formData.firstName} ${formData.lastName}</li>
          <li>Coverage Amount: $${Number(formData.coverageAmount).toLocaleString()}</li>
          <li>Coverage Type: ${formData.coverageType}</li>
          <li>Term Length: ${formData.termLength} years</li>
        </ul>
        <p>We'll be in touch soon with personalized quotes from top providers.</p>
        <p>Best regards,<br>The QuoteLinker Team</p>
      `
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
  }
} 