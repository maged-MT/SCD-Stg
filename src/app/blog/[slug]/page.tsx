import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseFragment, serialize } from "parse5";
import {
  Bookmark,
  Calendar,
  Clock,
  ShieldCheck,
  BadgeCheck,
  ListOrdered,
  ChevronRight,
  Tag,
  Car,
  CheckCircle2,
  Flag,
  type LucideIcon,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getPostBySlug, getPosts } from "@/lib/blogPosts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

interface ContentSection {
  id: string;
  title: string;
  bodyHtml: string;
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/&[a-z]+;/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section"
  );
}

// Slicing the source string at each heading can cut through a block
// element that legitimately spans multiple headings (e.g. a wrapper
// <div> opened before one heading and closed after the next), leaving
// an individual slice with an orphaned closing tag or a dangling open
// tag. Re-parsing each slice as its own fragment and serializing it
// back out forces it closed/balanced on its own — exactly like a real
// browser would render this slice in isolation — so it can't corrupt
// the DOM of whatever renders after it and desync SSR from hydration.
function normalizeFragment(html: string) {
  return serialize(parseFragment(html));
}

function splitContentIntoSections(html: string): ContentSection[] {
  const headingRegex = /<h([12])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const matches = [...html.matchAll(headingRegex)];

  if (matches.length === 0) {
    return [{ id: "overview", title: "Overview", bodyHtml: normalizeFragment(html) }];
  }

  const leading = html.slice(0, matches[0].index ?? 0).trim();
  const usedIds = new Set<string>();

  return matches.map((match, index) => {
    const rawTitle = match[2].replace(/<[^>]*>/g, "").trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? html.length : html.length;
    let bodyHtml = html.slice(start, end).trim();
    if (index === 0 && leading) bodyHtml = leading + bodyHtml;

    let id = slugify(rawTitle);
    while (usedIds.has(id)) id = `${id}-${index + 1}`;
    usedIds.add(id);

    return { id, title: rawTitle, bodyHtml: normalizeFragment(bodyHtml) };
  });
}

function sectionIcon(title: string): LucideIcon {
  const lower = title.toLowerCase();
  if (/(calculat|price|value|worth|cost)/.test(lower)) return Tag;
  if (/(paid|payment|selling|cash)/.test(lower)) return Car;
  if (/(why choose|benefit|advantage)/.test(lower)) return CheckCircle2;
  if (/(final thought|conclusion|summary|wrap up)/.test(lower)) return Flag;
  return ChevronRight;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const sections = splitContentIntoSections(post.content);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const whatsappShareHref = `https://api.whatsapp.com/send/?text=${encodeURIComponent(
    `${post.title} — ${shareUrl}`
  )}`;
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
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
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b1a]/95 via-[#0f2557]/88 to-[#0f2557]/95" />

        <div className="relative max-w-[900px] mx-auto text-center text-white">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[2px] text-white/55 mb-7"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Magazine
            </Link>
            <span>/</span>
            <span className="text-white/85">{post.tag}</span>
          </nav>

          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-2 rounded-full border border-white/20 mb-6">
            <Bookmark className="h-3.5 w-3.5" />
            {post.tag}
          </span>

          <h1 className="text-3xl lg:text-5xl font-black tracking-[-1.5px] leading-tight mb-7">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Premium Guide
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4" />
              Expert Verified
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1180px] mx-auto px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div>
            {/* Quick Navigation */}
            {sections.length > 1 && (
              <div className="bg-light-bg border border-border rounded-2xl p-6 lg:p-8 mb-8">
                <h2 className="flex items-center gap-2 text-base font-extrabold text-navy mb-5">
                  <ListOrdered className="h-[18px] w-[18px] text-blue" />
                  Quick Navigation
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 bg-white border border-border rounded-xl px-4 py-3 text-sm font-semibold text-navy hover:border-blue hover:text-blue transition-colors"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="line-clamp-1">{section.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Sections */}
            <div className="flex flex-col gap-6">
              {sections.map((section) => {
                const Icon = sectionIcon(section.title);
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="bg-white border border-border rounded-2xl p-6 lg:p-8 scroll-mt-28"
                  >
                    <h2 className="flex items-center gap-3 text-xl lg:text-2xl font-extrabold text-navy mb-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      {section.title}
                    </h2>
                    <div
                      className="text-gray-text leading-8 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2 [&_a]:text-blue [&_a]:font-semibold [&_a]:underline [&_strong]:text-navy [&_img]:rounded-xl [&_img]:my-6"
                      dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
                    />
                  </article>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgba(15,37,87,0.06)]">
              <h3 className="text-base font-extrabold text-navy mb-2">Quick Evaluation</h3>
              <p className="text-sm text-gray-text leading-6 mb-5">
                Find out your car&apos;s true market value in UAE today.
              </p>
              <Link
                href="/evaluate"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-br from-blue to-blue-dark text-white rounded-xl font-bold text-sm shadow-[0_8px_24px_rgba(43,108,245,0.3)] hover:-translate-y-0.5 transition-all"
              >
                Evaluate Now
              </Link>
            </div>

            <div className="bg-white border border-border rounded-2xl p-6 shadow-[0_8px_30px_rgba(15,37,87,0.06)]">
              <h3 className="text-base font-extrabold text-navy mb-4">Share Article</h3>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
                    <path d="M16.004 3C9.377 3 4.001 8.373 4.001 15c0 2.383.7 4.6 1.902 6.463L4 29l7.73-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.75a9.7 9.7 0 0 1-4.94-1.354l-.354-.21-4.586 1.107 1.144-4.469-.23-.366A9.7 9.7 0 0 1 5.751 15c0-5.652 4.6-10.25 10.253-10.25S26.257 9.348 26.257 15 21.658 24.75 16.004 24.75zm5.62-7.646c-.308-.154-1.82-.898-2.102-1.001-.282-.103-.487-.154-.692.154-.205.308-.795 1.001-.975 1.206-.18.205-.359.231-.667.077-.308-.154-1.3-.479-2.476-1.527-.915-.816-1.533-1.824-1.713-2.132-.18-.308-.019-.474.135-.627.138-.138.308-.359.462-.539.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.666-.949-2.283-.25-.6-.503-.519-.692-.529-.18-.008-.385-.01-.59-.01a1.13 1.13 0 0 0-.82.385c-.282.308-1.077 1.052-1.077 2.565s1.103 2.975 1.257 3.18c.154.205 2.17 3.313 5.257 4.646.734.317 1.307.507 1.754.649.737.234 1.408.201 1.938.122.591-.088 1.82-.744 2.077-1.462.256-.719.256-1.335.18-1.463-.077-.128-.282-.205-.59-.36z" />
                  </svg>
                </a>
                <a
                  href={facebookShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
                    <path d="M28 16c0-6.627-5.373-12-12-12S4 9.373 4 16c0 5.99 4.388 10.954 10.125 11.854V19.47h-3.047V16h3.047v-2.644c0-3.007 1.792-4.669 4.533-4.669 1.313 0 2.686.235 2.686.235v2.953H19.83c-1.491 0-1.956.925-1.956 1.874V16h3.328l-.532 3.47h-2.796v8.384C23.612 26.954 28 21.99 28 16z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
