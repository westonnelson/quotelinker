export function generateAgentNotificationEmail(leadData: {
  id: string
  full_name: string
  email: string
  phone: string
  zip_code: string
  insurance_type: string
  created_at: string
}) {
  const { full_name, email, phone, zip_code, insurance_type, created_at, id } = leadData
  const currentYear = new Date().getFullYear()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quotelinker.vercel.app"
  const formattedDate = new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Notification</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1A4D8F;
          padding: 20px;
          text-align: center;
          color: white;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .footer {
          background-color: #f5f8fa;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border: 1px solid #e0e0e0;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .lead-details {
          background-color: #f5f8fa;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .lead-details p {
          margin: 5px 0;
        }
        h1 { font-size: 24px; margin: 0; }
        h2 { font-size: 20px; margin-top: 0; }
        .button {
          display: inline-block;
          background-color: #1A4D8F;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>QuoteLinker</h1>
        </div>
        <div class="content">
          <h2>New Lead Assigned!</h2>
          <p>A new lead has been assigned to you in the QuoteLinker system.</p>
          
          <div class="lead-details">
            <h3 style="margin-top: 0;">Lead Details:</h3>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>ZIP Code:</strong> ${zip_code}</p>
            <p><strong>Insurance Type:</strong> ${insurance_type}</p>
            <p><strong>Submitted:</strong> ${formattedDate}</p>
          </div>
          
          <p>Please log in to your agent dashboard to view and contact this lead.</p>
          
          <a href="${appUrl}/agent-dashboard/leads/${id}" class="button">View Lead Details</a>
          
          <p>Best regards,<br>The QuoteLinker Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${currentYear} QuoteLinker. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

