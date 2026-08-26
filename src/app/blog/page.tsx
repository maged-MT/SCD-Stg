import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "News & Updates | Smart Car Deals UAE",
  description:
    "Latest news, tips, and updates from Smart Car Deals — UAE's #1 car buying service.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    slug: "how-to-get-best-price-for-your-car-uae",
    title: "How to Get the Best Price for Your Car in the UAE",
    excerpt:
      "Discover the key factors that affect your car's value in the UAE market and how Smart Car Deals ensures you get a fair, market-based offer every time.",
    date: "August 2026",
    tag: "Tips & Advice",
    readTime: "5 min read",
  },
  {
    slug: "sell-car-without-bank-loan-clearance-uae",
    title: "Can You Sell a Car With a Bank Loan in the UAE?",
    excerpt:
      "Many UAE car owners worry about selling a car that still has an active bank loan. We explain the process and how Smart Car Deals handles mortgage clearance for you.",
    date: "July 2026",
    tag: "FAQ",
    readTime: "4 min read",
  },
  {
    slug: "top-cars-selling-fast-dubai-2026",
    title: "Top 10 Cars Selling Fastest in Dubai in 2026",
    excerpt:
      "Our data shows which makes and models are in highest demand right now in Dubai — which means better prices for sellers.",
    date: "June 2026",
    tag: "Market Trends",
    readTime: "6 min read",
  },
  {
    slug: "rta-transfer-process-uae-guide",
    title: "A Complete Guide to RTA Transfer Process in UAE",
    excerpt:
      "The RTA transfer can be confusing. Here's a simple, step-by-step breakdown of what happens when you sell your car — and why Smart Car Deals handles it all for you.",
    date: "May 2026",
    tag: "Guide",
    readTime: "7 min read",
  },
  {
    slug: "sell-car-dubai-30-minutes",
    title: "Is It Really Possible to Sell Your Car in 30 Minutes?",
    excerpt:
      "You may have seen our claim that we can buy your car in just 30 minutes. Here's exactly how we do it — and what you need to bring to make it happen.",
    date: "April 2026",
    tag: "Behind the Scenes",
    readTime: "4 min read",
  },
  {
    slug: "best-time-to-sell-car-uae",
    title: "The Best Time of Year to Sell Your Car in the UAE",
    excerpt:
      "Does timing really matter when selling a car in the UAE? We share seasonal trends and market insights that can help you maximize your sale price.",
    date: "March 2026",
    tag: "Market Trends",
    readTime: "5 min read",
  },
];

const tagColors: Record<string, string> = {
  "Tips & Advice": "bg-blue/10 text-blue border-blue/20",
  FAQ: "bg-green-50 text-green-700 border-green-200",
  "Market Trends": "bg-orange-50 text-orange-700 border-orange-200",
  Guide: "bg-purple-50 text-purple-700 border-purple-200",
  "Behind the Scenes": "bg-pink-50 text-pink-700 border-pink-200",
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News & Updates", path: "/blog" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 py-16 px-6 text-center">
        <div className="max-w-[700px] mx-auto">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            News &amp; Updates
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-navy tracking-[-2px] mb-4">
            Smart Car Deals <span className="text-blue">Blog</span>
          </h1>
          <p className="text-gray-text text-lg leading-7">
            Tips, market insights, and guides to help you sell your car smarter in the UAE.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:border-blue hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(43,108,245,0.12)] transition-all duration-300 group"
            >
              {/* Card image placeholder */}
              <div className="h-[180px] bg-gradient-to-br from-light-bg to-blue/10 flex items-center justify-center">
                <span className="text-5xl">🚗</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      tagColors[post.tag] || "bg-blue/10 text-blue border-blue/20"
                    }`}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-text">{post.readTime}</span>
                </div>
                <h2 className="text-[17px] font-extrabold text-navy leading-snug mb-3 group-hover:text-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-text leading-7 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-text">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-blue hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-6 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Sell Your Car?
          </h2>
          <p className="text-white/70 mb-8 text-lg leading-7">
            Get a free instant valuation today. No fees, no hassle.
          </p>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue text-white rounded-xl font-bold text-[15px] hover:-translate-y-1 transition-all"
          >
            Get My Free Offer →
          </Link>
        </div>
      </section>
    </>
  );
}
