export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  image: string;
  intro: string;
  sections: BlogSection[];
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-get-best-price-for-your-car-uae",
    title: "How to Get the Best Price for Your Car in the UAE",
    excerpt:
      "Discover the key factors that affect your car's value in the UAE market and how Smart Car Deals ensures you get a fair, market-based offer every time.",
    date: "August 2026",
    tag: "Tips & Advice",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    intro:
      "Selling a car in the UAE should be simple, but most owners leave money on the table because they don't understand what actually drives a valuation. Whether you're selling privately, trading in at a dealership, or using a direct car buying service, knowing what pushes your price up — and what quietly drags it down — puts you back in control of the deal.",
    sections: [
      {
        heading: "What Determines Your Car's Value",
        paragraphs: [
          "Every valuation in the UAE market comes down to a handful of core factors: mileage, overall condition, service history, accident record, and current demand for your specific make and model. GCC-specification vehicles with a documented service history and low mileage consistently command a premium over imported or poorly maintained equivalents.",
          "Market timing also plays a role. Popular family SUVs and pickups tend to hold their value better in Dubai and Abu Dhabi than niche models, simply because resale demand is higher.",
        ],
      },
      {
        heading: "Common Mistakes That Cost You Money",
        list: [
          "Guessing your car's value instead of checking live market listings for the same make, model, and year.",
          "Ignoring or misplacing service records, which buyers use to justify a lower offer.",
          "Accepting the first offer without comparing at least two or three sources.",
          "Waiting too long to sell after a loan is paid off or registration is close to expiry, both of which reduce your negotiating position.",
        ],
      },
      {
        heading: "How Smart Car Deals Ensures a Fair Price",
        paragraphs: [
          "Our valuation engine cross-references live market data across the UAE — not just a fixed price book — so your offer reflects what buyers are actually paying for cars like yours right now. A trained inspector then verifies the vehicle's real condition on-site, and the number we quote is the number you receive, with no last-minute deductions.",
        ],
      },
    ],
  },
  {
    slug: "sell-car-without-bank-loan-clearance-uae",
    title: "Can You Sell a Car With a Bank Loan in the UAE?",
    excerpt:
      "Many UAE car owners worry about selling a car that still has an active bank loan. We explain the process and how Smart Car Deals handles mortgage clearance for you.",
    date: "July 2026",
    tag: "FAQ",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    intro:
      "Yes — you can sell a financed car in the UAE, even if the loan isn't fully paid off. The confusion usually comes from the RTA's mortgage system, which registers the bank as a legal interest holder on your vehicle until the loan is cleared. Here's what that actually means for a sale.",
    sections: [
      {
        heading: "Understanding Mortgage Clearance in the UAE",
        paragraphs: [
          "When you finance a car, the bank registers a 'mortgage' against the vehicle with the RTA. This simply means ownership can't be transferred to a new party until the outstanding loan is settled and the bank issues a liability or clearance letter confirming there's nothing left to pay.",
        ],
      },
      {
        heading: "The Usual (Painful) Process",
        paragraphs: [
          "Normally, selling a financed car means visiting your bank to request a liability letter, paying off the remaining balance yourself (often from the sale proceeds, which creates a timing problem), waiting for the clearance to be processed, and only then booking an RTA appointment to transfer ownership. This can easily stretch over several days and requires the buyer to trust that everything will go through.",
        ],
      },
      {
        heading: "How Smart Car Deals Handles It For You",
        paragraphs: [
          "We settle the outstanding loan directly with your bank as part of the purchase. Our team requests the liability letter, pays off the balance, and completes the RTA transfer on your behalf — you simply receive the remaining equity in cash the same day, with none of the back-and-forth.",
        ],
      },
    ],
  },
  {
    slug: "top-cars-selling-fast-dubai-2026",
    title: "Top 10 Cars Selling Fastest in Dubai in 2026",
    excerpt:
      "Our data shows which makes and models are in highest demand right now in Dubai — which means better prices for sellers.",
    date: "June 2026",
    tag: "Market Trends",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    intro:
      "Not every car depreciates at the same rate in the UAE. Some models are snapped up within days of listing because demand consistently outpaces supply. If you own one of these, you're in a strong position to sell quickly and at a competitive price.",
    sections: [
      {
        heading: "The Models in Highest Demand",
        list: [
          "Toyota Land Cruiser — the benchmark full-size SUV for UAE buyers, prized for reliability and resale value.",
          "Nissan Patrol — a close rival to the Land Cruiser with a loyal local following.",
          "Toyota Camry — the default choice for taxi fleets and daily commuters alike, keeping demand steady.",
          "Lexus ES — sought after for its comfort-to-price ratio in the mid-size luxury segment.",
          "Nissan Altima — a budget-friendly family sedan that moves fast in the used market.",
          "Toyota Corolla — consistently one of the easiest cars to resell in the UAE.",
          "Toyota Hilux — pickup demand remains strong for both personal and commercial buyers.",
          "Mercedes-Benz GLE — a favorite in the used luxury SUV segment.",
          "Ford F-150 — popular among buyers wanting a full-size American pickup.",
          "Toyota Fortuner — a practical SUV alternative to the Land Cruiser at a lower price point.",
        ],
      },
      {
        heading: "Why These Models Sell Fast",
        paragraphs: [
          "Reliability, parts availability, and strong GCC-spec resale reputations drive demand for most of these vehicles. Toyota and Nissan in particular benefit from an established service network across all seven Emirates, which reassures used-car buyers.",
        ],
      },
      {
        heading: "What This Means If You're Selling",
        paragraphs: [
          "If your car is on this list, you can typically expect a faster sale and a smaller gap between asking price and final offer. Even if it isn't, condition, mileage, and service history still matter far more than the model name alone.",
        ],
      },
    ],
  },
  {
    slug: "rta-transfer-process-uae-guide",
    title: "A Complete Guide to RTA Transfer Process in UAE",
    excerpt:
      "The RTA transfer can be confusing. Here's a simple, step-by-step breakdown of what happens when you sell your car — and why Smart Car Deals handles it all for you.",
    date: "May 2026",
    tag: "Guide",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    intro:
      "Transferring vehicle ownership through the RTA is the final, legally required step of any car sale in the UAE. It's straightforward once you know the sequence — but a single missing document or unpaid fine can send you back to square one.",
    sections: [
      {
        heading: "Documents You'll Need",
        list: [
          "Valid Emirates ID for both buyer and seller.",
          "Original vehicle registration card (Mulkiya).",
          "A valid vehicle passing/inspection certificate.",
          "Bank liability or clearance letter, if the car was financed.",
          "Valid comprehensive or third-party insurance for the new owner.",
        ],
      },
      {
        heading: "Step-by-Step Transfer Process",
        list: [
          "Book a vehicle inspection to confirm the car passes RTA roadworthiness standards.",
          "Settle any outstanding loan and obtain a bank clearance letter, if applicable.",
          "Clear all traffic fines and Salik or parking dues linked to the vehicle.",
          "Visit an RTA service center or approved typing center with both parties present, or with authorized documentation.",
          "Complete the ownership transfer and receive the new registration card in the buyer's name.",
          "Confirm the new owner's insurance policy is active before driving the car away.",
        ],
      },
      {
        heading: "Common Pitfalls to Avoid",
        paragraphs: [
          "The most frequent delays come from unpaid fines showing up at the last minute, an expired registration or inspection certificate, or insurance that hasn't been updated to reflect the new owner. Any one of these can stall a transfer on the day of sale.",
        ],
      },
      {
        heading: "How Smart Car Deals Simplifies This",
        paragraphs: [
          "When you sell to us, our team manages the entire transfer process — inspection, fine checks, loan clearance, and RTA paperwork — so you never have to queue at a typing center or chase documents yourself.",
        ],
      },
    ],
  },
  {
    slug: "sell-car-dubai-30-minutes",
    title: "Is It Really Possible to Sell Your Car in 30 Minutes?",
    excerpt:
      "You may have seen our claim that we can buy your car in just 30 minutes. Here's exactly how we do it — and what you need to bring to make it happen.",
    date: "April 2026",
    tag: "Behind the Scenes",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    intro:
      "It sounds too fast to be real, but a 30-minute car sale is achievable once you cut out the parts of the process that traditionally cause delays: haggling, waiting on bank approvals, and chasing paperwork after the fact.",
    sections: [
      {
        heading: "The 30-Minute Breakdown",
        list: [
          "0–5 minutes: You share your car's details online or by phone and receive an initial market-based valuation.",
          "5–20 minutes: A doorstep or center inspection confirms the car's real condition against the details provided.",
          "20–22 minutes: We present a final offer based on the inspection — no renegotiation games.",
          "22–30 minutes: You accept, we complete the paperwork, and payment is transferred to your account or handed over on the spot.",
        ],
      },
      {
        heading: "What You Need to Bring",
        list: [
          "Valid Emirates ID.",
          "Original vehicle registration card (Mulkiya).",
          "All sets of keys.",
          "Service history, if available.",
          "Bank liability letter, if your car still has an active loan.",
        ],
      },
      {
        heading: "Why Speed Doesn't Mean a Lower Price",
        paragraphs: [
          "Because our valuation is built from live market data rather than back-and-forth negotiation, moving fast doesn't cost you money — it just removes the waiting.",
        ],
      },
    ],
  },
  {
    slug: "best-time-to-sell-car-uae",
    title: "The Best Time of Year to Sell Your Car in the UAE",
    excerpt:
      "Does timing really matter when selling a car in the UAE? We share seasonal trends and market insights that can help you maximize your sale price.",
    date: "March 2026",
    tag: "Market Trends",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    intro:
      "Timing can nudge your final price, but it rarely outweighs the basics of condition, mileage, and market demand. Still, if you have flexibility on when to sell, a few seasonal patterns in the UAE are worth knowing.",
    sections: [
      {
        heading: "Seasonal Demand Patterns",
        paragraphs: [
          "Demand for used cars typically picks up from September through November, as the new school year and the return of expats from summer travel bring more buyers into the market. Activity often rises again around year-end, as bonuses and new-year purchases prompt people to upgrade and sell their current vehicle.",
        ],
      },
      {
        heading: "Registration Renewal Timing",
        paragraphs: [
          "One factor that matters more than the calendar season is your own registration and insurance renewal date. Selling shortly before either is due avoids paying for a renewal you won't benefit from, and keeps more of the sale value in your pocket.",
        ],
      },
      {
        heading: "Does Waiting for the 'Right' Season Pay Off?",
        paragraphs: [
          "Rarely. Cars depreciate every month regardless of season, so holding out for a slightly busier period can cost you more in lost value than any seasonal bump would gain. A well-priced car in good condition tends to sell quickly at almost any time of year.",
        ],
      },
      {
        heading: "Our Recommendation",
        paragraphs: [
          "Because Smart Car Deals prices every car against live market data rather than a fixed seasonal calendar, you get a fair offer whenever you're ready to sell — without needing to time the market yourself.",
        ],
      },
    ],
  },
];

export const tagColors: Record<string, string> = {
  "Tips & Advice": "bg-blue/10 text-blue border-blue/20",
  FAQ: "bg-green-50 text-green-700 border-green-200",
  "Market Trends": "bg-orange-50 text-orange-700 border-orange-200",
  Guide: "bg-purple-50 text-purple-700 border-purple-200",
  "Behind the Scenes": "bg-pink-50 text-pink-700 border-pink-200",
};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}
