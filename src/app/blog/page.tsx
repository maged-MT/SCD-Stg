import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { posts, tagColors } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "News & Updates | Smart Car Deals UAE",
  description:
    "Latest news, tips, and updates from Smart Car Deals — UAE's #1 car buying service.",
  alternates: {
    canonical: "/blog",
  },
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
      <section className="bg-gradient-to-br from-[#f0f7ff] via-[#e2eeff] to-[#f0f7ff] border-b border-blue/10 pt-24 pb-16 px-6 text-center">
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
              {/* Card image */}
              <div className="h-[200px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
