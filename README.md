# QuoteLinker


## Executive Summary

**Business Name:** QuoteLinker LLC  
**Domain:** [www.quotelinker.com](https://www.quotelinker.com)  
**Location:** Minneapolis, Minnesota  
**Founder:** Weston Nelson, Licensed Insurance Producer  
**Business Type:** LLC, Registered in Minnesota  
**Industry:** Digital Lead Generation / InsurTech  
**Business Stage:** Early-stage (MVP live, pre-revenue, initial funding phase)

### Vision Statement

QuoteLinker’s vision is to bridge the gap between consumers seeking insurance and agents ready to serve them by providing exclusive, high-intent, and locally-targeted leads through a proprietary digital platform. Built by an insurance agent for insurance agents, QuoteLinker is designed to restore trust and performance to an industry plagued by low-quality leads and outdated systems.

---

## Company Overview

**Legal Entity:** QuoteLinker LLC  
**State of Organization:** Minnesota  
**Registered Agent:** Northwest Registered Agent  
**Website:** [www.quotelinker.com](https://www.quotelinker.com)  
**Hosting:** Deployed via [Vercel](https://vercel.com), with DNS configured through Cloudflare  
**Email:** <support@quotelinker.com>

QuoteLinker was created to solve a critical problem in the $8 billion insurance lead generation industry: poor lead quality and a lack of exclusivity. By leveraging modern digital tools, SEO, paid advertising, AI-powered forms, and CRM integrations, QuoteLinker delivers real-time, exclusive, high-quality leads. Our SaaS hybrid model allows agents to subscribe monthly or purchase leads à la carte.

---

## Market Research

**Industry Overview:**  
The U.S. insurance industry is a $1.3 trillion market with over 1 million licensed agents. Most agents rely on third-party lead services like EverQuote, QuoteWizard, and SmartFinancial — which often provide recycled, overpriced, low-intent leads.

**Target Market:**

- **Primary:** Independent and captive insurance agents (State Farm, Allstate, Farmers, etc.)
- **Secondary:** Agencies and brokerages seeking digital scale
- **Initial Focus:** Minnesota-based agents, expanding regionally within 12–18 months

**Our Advantage:**

- Agent-founded and tested
- Exclusive, real-time, high-quality leads
- Local targeting & transparent lead sources
- Simple SaaS hybrid model

---

## Tech Stack

| Layer    | Tool                                |
| -------- | ----------------------------------- |
| Frontend | Next.js (TypeScript)                |
| Backend  | Next.js API Routes + Supabase       |
| Database | Supabase Postgres                   |
| Hosting  | Vercel                              |
| DNS      | Cloudflare                          |
| Email    | Resend (SMTP) + Nodemailer          |
| CRM Sync | Salesforce & Google Sheets (coming) |

---

## Quickstart (Local Dev)

```bash
git clone https://github.com/westonnelson/quotelinker.git
cd quotelinker
cp .env.local.example .env.local
npm install
npm run dev
```
