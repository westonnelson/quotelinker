import type { BlogPost } from "./types"

// This would typically come from a CMS or database
// For now, we'll use a static array
const blogPosts: BlogPost[] = [
  {
    slug: "life-insurance-for-young-families",
    title: "Life Insurance for Young Families",
    excerpt: "Why young families need life insurance and how to choose the right coverage for your needs.",
    date: "2023-06-12",
    category: "Life Insurance",
    coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop",
    readingTime: "5 min read",
    featured: true,
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      bio: "Sarah is a certified financial planner with over 10 years of experience in the insurance industry.",
    },
    content: `
      <p>When you start a family, your financial responsibilities grow significantly. One of the most important financial decisions you'll make is whether to purchase life insurance—and if so, how much coverage you need.</p>
      
      <h2>Why Young Families Need Life Insurance</h2>
      
      <p>Life insurance is especially important for young families for several reasons:</p>
      
      <ul>
        <li><strong>Income Replacement:</strong> If you're the primary breadwinner and something happens to you, life insurance can replace your income and help your family maintain their standard of living.</li>
        <li><strong>Debt Coverage:</strong> Many young families have significant debts like mortgages, car loans, or student loans. Life insurance can help pay off these debts if you pass away.</li>
        <li><strong>Childcare Costs:</strong> If you or your spouse provides childcare, life insurance can help cover the cost of hiring help if that person is no longer around.</li>
        <li><strong>Future Education Expenses:</strong> Life insurance can help ensure your children's education is funded even if you're not there to provide for them.</li>
      </ul>
      
      <h2>Types of Life Insurance for Young Families</h2>
      
      <p>There are two main types of life insurance to consider:</p>
      
      <h3>Term Life Insurance</h3>
      
      <p>Term life insurance provides coverage for a specific period (typically 10, 20, or 30 years). It's generally more affordable than permanent life insurance, making it a popular choice for young families with budget constraints.</p>
      
      <p>With term life insurance, you pay premiums for the duration of the term. If you pass away during that term, your beneficiaries receive the death benefit. If you outlive the term, the coverage ends unless you renew it (usually at a higher premium).</p>
      
      <h3>Permanent Life Insurance</h3>
      
      <p>Permanent life insurance (such as whole life or universal life) provides lifelong coverage as long as premiums are paid. These policies also include a cash value component that grows over time.</p>
      
      <p>While permanent life insurance is more expensive than term life, it offers benefits like guaranteed coverage for life and the ability to build cash value that you can borrow against or withdraw.</p>
      
      <h2>How Much Coverage Do You Need?</h2>
      
      <p>Determining how much life insurance you need depends on several factors:</p>
      
      <ul>
        <li><strong>Income Replacement:</strong> A common rule of thumb is to have coverage equal to 10-15 times your annual income.</li>
        <li><strong>Debt and Final Expenses:</strong> Calculate your mortgage, car loans, student loans, credit card debt, and estimated funeral costs.</li>
        <li><strong>Future Expenses:</strong> Consider future needs like college tuition for your children.</li>
        <li><strong>Existing Resources:</strong> Take into account existing savings, investments, and any employer-provided life insurance.</li>
      </ul>
      
      <h2>Finding the Right Policy</h2>
      
      <p>When shopping for life insurance, consider these tips:</p>
      
      <ul>
        <li>Compare quotes from multiple insurers to find the best rates.</li>
        <li>Consider working with an independent agent who can help you navigate options from different companies.</li>
        <li>Look for policies with a conversion option, which allows you to convert a term policy to a permanent one without a medical exam.</li>
        <li>Review the financial strength ratings of insurance companies to ensure they'll be around when your family needs them.</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Life insurance is a crucial part of financial planning for young families. By understanding your needs and options, you can choose a policy that provides peace of mind and financial security for your loved ones.</p>
    `,
    meta: {
      title: "Life Insurance for Young Families | QuoteLinker",
      description:
        "Learn why young families need life insurance and how to choose the right coverage to protect your loved ones' financial future.",
      keywords: ["life insurance", "family protection", "term life", "whole life", "financial planning"],
      ogImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop",
    },
    relatedPosts: ["term-vs-whole-life-insurance", "life-insurance-tax-benefits"],
  },
  {
    slug: "home-insurance-mistakes",
    title: "5 Common Home Insurance Mistakes",
    excerpt: "Avoid these common pitfalls when purchasing homeowners insurance to ensure you have adequate protection.",
    date: "2023-05-28",
    category: "Home Insurance",
    coverImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    readingTime: "4 min read",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
      bio: "Michael is a home insurance specialist with 15 years of experience in the property insurance sector.",
    },
    content: `
      <p>Homeowners insurance is essential for protecting your most valuable asset, but many people make critical mistakes when purchasing coverage. Here are five common pitfalls to avoid:</p>
      
      <h2>1. Insuring for Market Value Instead of Replacement Cost</h2>
      
      <p>One of the biggest mistakes homeowners make is insuring their home for its market value rather than its replacement cost. Market value includes the land value and is influenced by location and real estate trends. Replacement cost is what it would actually cost to rebuild your home from scratch with similar materials and quality.</p>
      
      <p>If you insure based on market value, you might find yourself underinsured if disaster strikes. Always make sure your policy covers the full cost to rebuild your home.</p>
      
      <h2>2. Overlooking Flood and Earthquake Coverage</h2>
      
      <p>Standard homeowners insurance policies typically don't cover flood or earthquake damage. If you live in an area prone to these disasters, you'll need separate policies or endorsements.</p>
      
      <p>Even if you don't live in a high-risk flood zone, consider that about 20% of flood claims come from properties in low to moderate-risk areas. Don't wait until it's too late to get coverage.</p>
      
      <h2>3. Underestimating Personal Property Value</h2>
      
      <p>Many homeowners don't realize how much their belongings are actually worth. Take time to create a home inventory with photos, descriptions, and estimated values of your possessions. This not only helps you determine how much coverage you need but also makes the claims process easier if you ever need to file one.</p>
      
      <p>Consider scheduling high-value items like jewelry, art, or collectibles, as standard policies have limits on these categories.</p>
      
      <h2>4. Setting Deductibles Too Low</h2>
      
      <p>While a low deductible might seem appealing, it results in higher premiums. Consider raising your deductible to save on monthly costs, but make sure you have enough savings to cover that amount if you need to file a claim.</p>
      
      <p>The ideal deductible balances affordable premiums with an out-of-pocket expense you can manage in an emergency.</p>
      
      <h2>5. Not Updating Coverage After Home Improvements</h2>
      
      <p>If you renovate your home, add square footage, or make significant improvements, your insurance needs will change. A kitchen remodel, bathroom upgrade, or new addition increases your home's replacement value.</p>
      
      <p>Contact your insurance agent after completing major home improvements to update your coverage accordingly. Failing to do so could leave you underinsured.</p>
      
      <h2>Conclusion</h2>
      
      <p>Avoiding these common mistakes can help ensure you have the right homeowners insurance coverage for your needs. Review your policy annually and after major life changes or home improvements to make sure you're adequately protected.</p>
      
      <p>Remember, the goal of insurance is to restore you to your pre-loss condition. Having the right coverage means you won't have to worry about financial hardship on top of the stress of dealing with property damage or loss.</p>
    `,
    meta: {
      title: "5 Common Home Insurance Mistakes to Avoid | QuoteLinker",
      description:
        "Learn about the most common mistakes homeowners make when purchasing insurance and how to avoid them for better protection.",
      keywords: [
        "home insurance",
        "homeowners insurance",
        "insurance mistakes",
        "property coverage",
        "replacement cost",
      ],
      ogImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    slug: "comparing-auto-insurance",
    title: "How to Compare Auto Insurance Quotes",
    excerpt: "Tips for understanding and comparing auto insurance quotes to find the best coverage for your needs.",
    date: "2023-04-17",
    category: "Auto Insurance",
    coverImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    readingTime: "6 min read",
    author: {
      name: "Jennifer Lee",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
      bio: "Jennifer is an auto insurance expert with a background in consumer advocacy and insurance comparison.",
    },
    content: `
      <p>Shopping for auto insurance can be overwhelming with so many options and variables to consider. This guide will help you effectively compare quotes to find the best coverage for your needs and budget.</p>
      
      <h2>Understanding Coverage Types</h2>
      
      <p>Before comparing quotes, understand the different types of coverage:</p>
      
      <ul>
        <li><strong>Liability Coverage:</strong> Pays for damage you cause to others (bodily injury and property damage)</li>
        <li><strong>Collision Coverage:</strong> Pays for damage to your car from accidents</li>
        <li><strong>Comprehensive Coverage:</strong> Covers non-collision damage like theft, vandalism, or natural disasters</li>
        <li><strong>Personal Injury Protection:</strong> Covers medical expenses regardless of fault</li>
        <li><strong>Uninsured/Underinsured Motorist:</strong> Protects you if you're hit by a driver with insufficient coverage</li>
      </ul>
      
      <h2>Compare Apples to Apples</h2>
      
      <p>The most important rule when comparing auto insurance quotes is to ensure you're comparing the same coverage levels across all quotes. Differences in coverage limits, deductibles, or included features can significantly impact the price.</p>
      
      <p>Create a standardized coverage profile with the same limits and deductibles to use when requesting quotes from different insurers.</p>
      
      <h2>Look Beyond the Premium</h2>
      
      <p>While the monthly or annual premium is important, it shouldn't be your only consideration. Also evaluate:</p>
      
      <ul>
        <li><strong>Deductible amounts:</strong> How much you'll pay out-of-pocket before insurance kicks in</li>
        <li><strong>Coverage limits:</strong> The maximum amount the insurer will pay</li>
        <li><strong>Exclusions:</strong> What isn't covered by the policy</li>
        <li><strong>Discounts:</strong> Available savings for bundling, safe driving, etc.</li>
        <li><strong>Claims process:</strong> How easy it is to file and resolve claims</li>
        <li><strong>Customer service reputation:</strong> How the company treats its customers</li>
      </ul>
      
      <h2>Research Company Reputation</h2>
      
      <p>The cheapest insurance isn't always the best if the company has poor customer service or makes it difficult to file claims. Research each insurer's:</p>
      
      <ul>
        <li>Financial stability ratings (A.M. Best, Standard & Poor's)</li>
        <li>Customer satisfaction scores (J.D. Power, Consumer Reports)</li>
        <li>Complaint ratios (National Association of Insurance Commissioners)</li>
        <li>Online reviews from current customers</li>
      </ul>
      
      <h2>Consider Total Value</h2>
      
      <p>Some companies offer valuable extras that might make a slightly higher premium worthwhile:</p>
      
      <ul>
        <li>Accident forgiveness</li>
        <li>Diminishing deductibles</li>
        <li>Roadside assistance</li>
        <li>Rental car coverage</li>
        <li>Gap insurance for leased or financed vehicles</li>
        <li>Mobile app features for policy management and claims</li>
      </ul>
      
      <h2>Ask About Discounts</h2>
      
      <p>Most insurers offer various discounts that can significantly reduce your premium:</p>
      
      <ul>
        <li>Multi-policy (bundling home and auto)</li>
        <li>Multi-vehicle</li>
        <li>Safe driver/claim-free</li>
        <li>Good student</li>
        <li>Vehicle safety features</li>
        <li>Professional organization or employer discounts</li>
        <li>Paperless billing or automatic payments</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Taking the time to properly compare auto insurance quotes can save you money while ensuring you have the right coverage. Remember to reassess your insurance needs periodically, especially after major life changes like moving, buying a new car, or adding a teen driver to your policy.</p>
      
      <p>The best insurance policy balances affordable premiums with adequate coverage and comes from a company with a solid reputation for customer service and claims handling.</p>
    `,
    meta: {
      title: "How to Compare Auto Insurance Quotes Effectively | QuoteLinker",
      description:
        "Learn how to properly compare auto insurance quotes to find the best coverage for your needs and budget without sacrificing protection.",
      keywords: ["auto insurance", "car insurance", "insurance quotes", "compare insurance", "coverage comparison"],
      ogImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    },
  },
]

// Get all blog posts with basic info for listings
export function getAllPosts() {
  return blogPosts.map(({ slug, title, excerpt, date, category, coverImage, readingTime, featured }) => ({
    slug,
    title,
    excerpt,
    date,
    category,
    coverImage,
    readingTime,
    featured,
  }))
}

// Get featured post
export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured)
}

// Get post by slug
export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

// Get posts by category
export function getPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category)
}

// Get related posts
export function getRelatedPosts(slug: string) {
  const post = getPostBySlug(slug)
  if (!post || !post.relatedPosts || post.relatedPosts.length === 0) {
    // If no related posts defined, return posts from the same category
    const category = post?.category || ""
    return getPostsByCategory(category)
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
  }

  return post.relatedPosts.map((relatedSlug) => getPostBySlug(relatedSlug)).filter(Boolean) as BlogPost[]
}

// Get categories with counts
export function getCategories() {
  const categories: Record<string, number> = {}

  blogPosts.forEach((post) => {
    if (categories[post.category]) {
      categories[post.category]++
    } else {
      categories[post.category] = 1
    }
  })

  return Object.entries(categories).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }))
}

// Get popular posts (for sidebar)
export function getPopularPosts() {
  // In a real app, this would be based on view counts or other metrics
  // For now, we'll just return the most recent posts
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      date: formatDate(post.date),
    }))
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

