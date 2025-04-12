# QuoteLinker

QuoteLinker is a modern web application that helps users get personalized life insurance quotes quickly and easily.

## Features

- Personalized life insurance quotes
- Real-time rate comparison
- Secure form submission
- Email notifications
- Google Analytics integration
- Google Tag Manager setup
- HubSpot integration
- Supabase database
- Resend email service

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Resend
- Google Analytics 4
- Google Tag Manager
- HubSpot

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
   NEXT_PUBLIC_GTM_ID=your_gtm_id
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id
   NEXT_PUBLIC_HUBSPOT_FORM_ID=your_hubspot_form_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is deployed on Vercel. The deployment is automatically triggered when changes are pushed to the main branch.

## Testing Integrations

Visit `/api/test-integrations` to test all integrations:
- Supabase connection
- Resend email service
- Google Analytics
- Google Tag Manager
- HubSpot forms

## License

MIT 