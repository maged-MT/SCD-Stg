import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts, posts, tagColors } from "@/lib/blogPosts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Smart Car Deals UAE`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News & Updates", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative border-b border-blue/10 pt-24 pb-16 px-6 overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/95" />

        <div className="relative max-w-[800px] mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue hover:underline mb-6"
          >
            ← Back to Blog
          </Link>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                tagColors[post.tag] || "bg-blue/10 text-blue border-blue/20"
              }`}
            >
              {post.tag}
            </span>
            <span className="text-xs text-gray-text">{post.readTime}</span>
            <span className="text-xs text-gray-text">•</span>
            <span className="text-xs text-gray-text">{post.date}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-navy tracking-[-1.5px] leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Featured image */}
      <div className="max-w-[800px] mx-auto px-6 -mt-2">
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] lg:h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Article */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <p className="text-lg text-gray-text leading-8 mb-10">{post.intro}</p>

        {post.sections.map((section, index) => (
          <div key={index} className="mb-10">
            {section.heading && (
              <h2 className="text-2xl font-extrabold text-navy tracking-tight mb-4">
                {section.heading}
              </h2>
            )}
            {section.paragraphs?.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-gray-text leading-8 mb-4">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-3 mt-2">
                {section.list.map((item, lIndex) => (
                  <li key={lIndex} className="flex items-start gap-3 text-gray-text leading-7">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-14 p-8 bg-light-bg border border-border rounded-2xl text-center">
          <h3 className="text-xl font-extrabold text-navy mb-2">
            Ready to Sell Your Car?
          </h3>
          <p className="text-gray-text mb-6">
            Get a free, instant, market-based valuation today. No fees, no hassle.
          </p>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold shadow-[0_8px_24px_rgba(43,108,245,0.35)] hover:-translate-y-1 transition-all"
          >
            Get My Free Offer →
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-light-bg border-t border-border py-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-2xl font-extrabold text-navy tracking-tight mb-10 text-center">
              More From the Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <article
                  key={related.slug}
                  className="bg-white border border-border rounded-2xl overflow-hidden hover:border-blue hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(43,108,245,0.12)] transition-all duration-300 group"
                >
                  <div className="h-[160px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                          tagColors[related.tag] || "bg-blue/10 text-blue border-blue/20"
                        }`}
                      >
                        {related.tag}
                      </span>
                      <span className="text-xs text-gray-text">{related.readTime}</span>
                    </div>
                    <h3 className="text-[17px] font-extrabold text-navy leading-snug mb-3 group-hover:text-blue transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-text leading-7 mb-4">{related.excerpt}</p>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="text-sm font-bold text-blue hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
