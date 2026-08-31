import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getPosts, tagColors } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "News & Updates | Smart Car Deals UAE",
  description:
    "Latest news, tips, and updates from Smart Car Deals — UAE's #1 car buying service.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featuredPost, ...remainingPosts] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.tag)));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News & Updates", path: "/blog" },
        ])}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#07142f] via-[#102b61] to-[#1e428a] border-b border-blue/20 pt-32 pb-20 px-6 text-center text-white">
        <div className="max-w-[760px] mx-auto">
          <span className="inline-block bg-[#f5a623]/10 text-[#ffc153] text-[10px] font-black tracking-[3px] uppercase px-5 py-2 rounded-full border border-[#f5a623]/30 mb-6">
            Smart Car Deals Magazine
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-2.5px] leading-[1.05] mb-5">
            UAE Car Insider
            <span className="block">News &amp; Updates</span>
          </h1>
          <p className="text-white/70 text-base lg:text-lg leading-8 max-w-[660px] mx-auto">
            Expert tips on selling your car in UAE. Market insights, how-to guides, and industry news
            to help you get the best deal.
          </p>
          <div className="grid grid-cols-3 max-w-[590px] mx-auto mt-12 rounded-2xl border border-white/10 bg-white/[0.06] overflow-hidden">
            <div className="px-3 py-6 border-r border-white/10">
              <strong className="block text-2xl lg:text-3xl text-blue">20+</strong>
              <span className="block mt-2 text-[9px] font-black uppercase tracking-wider text-white/55">Published Articles</span>
            </div>
            <div className="px-3 py-6 border-r border-white/10">
              <strong className="block text-2xl lg:text-3xl text-blue">10K+</strong>
              <span className="block mt-2 text-[9px] font-black uppercase tracking-wider text-white/55">Monthly Readers</span>
            </div>
            <div className="px-3 py-6">
              <strong className="block text-2xl lg:text-3xl text-blue">Weekly</strong>
              <span className="block mt-2 text-[9px] font-black uppercase tracking-wider text-white/55">New Content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-gradient-to-b from-white to-[#f7faff] px-5 lg:px-6 py-12 lg:py-16">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            <span className="text-sm font-semibold text-gray-text mr-1">Category:</span>
            <span className="px-6 py-2.5 rounded-full bg-blue text-white text-xs font-bold shadow-[0_6px_18px_rgba(43,108,245,0.28)]">
              All
            </span>
            {categories.map((category) => (
              <span key={category} className="px-6 py-2.5 rounded-full bg-white border border-border text-navy text-xs font-bold">
                {category}
              </span>
            ))}
          </div>

          {featuredPost && (
            <article className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-border rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(15,37,87,0.08)] mb-12 group">
              <Link href={`/blog/${featuredPost.slug}`} className="relative min-h-[300px] lg:min-h-[460px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-5 left-5 bg-blue text-white rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider shadow-lg">
                  ★ Featured Article
                </span>
              </Link>
              <div className="p-8 lg:p-14 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-gray-text">
                  <span className={`rounded-md px-3 py-1.5 border font-bold ${tagColors[featuredPost.tag] || "bg-blue/10 text-blue border-blue/20"}`}>
                    {featuredPost.tag}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-[-1.5px] leading-[1.12] mb-5">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-text leading-7 mb-7 line-clamp-4">{featuredPost.excerpt}</p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="self-start px-6 py-3.5 bg-blue text-white rounded-xl text-sm font-extrabold hover:bg-blue-dark transition-colors"
                >
                  Read Full Article →
                </Link>
              </div>
            </article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {remainingPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-border rounded-[22px] overflow-hidden hover:border-blue hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(43,108,245,0.12)] transition-all duration-300 group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="relative h-[220px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1.5 border text-[9px] font-black uppercase ${tagColors[post.tag] || "bg-white text-blue border-blue/20"}`}>
                    {post.tag}
                  </span>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-gray-text mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-navy leading-snug mb-3 group-hover:text-blue transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-text leading-6 mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">SmartCar Team</span>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-extrabold text-blue hover:underline">
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-6 text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Sell Your Car?</h2>
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
