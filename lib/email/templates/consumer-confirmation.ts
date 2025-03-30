export function generateConsumerConfirmationEmail(data: {
  fullName: string
  email: string
  phone: string
  zipCode: string
  insuranceType: string
}) {
  const { fullName } = data
  const currentYear = new Date().getFullYear()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quotelinker.vercel.app"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Quote Request Confirmation</title>
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
        .info-box {
          background-color: #f5f8fa;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        h1 { font-size: 24px; margin: 0; }
        h2 { font-size: 20px; margin-top: 0; }
        ul { padding-left: 20px; }
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
          <h2>Thank You, ${fullName}!</h2>
          <p>We've received your life insurance quote request. A licensed agent will contact you shortly to discuss your options.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0;">What happens next?</h3>
            <ul>
              <li>A licensed agent will call or email you within 24 hours</li>
              <li>They will help you compare quotes from top insurance providers</li>
              <li>You'll receive personalized recommendations based on your needs</li>
            </ul>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <a href="${appUrl}" class="button">Visit Our Website</a>
          
          <p>Best regards,<br>The QuoteLinker Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${currentYear} QuoteLinker. All rights reserved.</p>
          <p>If you did not request this quote, please disregard this email.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

