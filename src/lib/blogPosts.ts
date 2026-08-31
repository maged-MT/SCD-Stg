export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  image: string;
  content: string;
}

interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: Array<Array<{ name?: string; taxonomy?: string }>>;
  };
}

const BLOG_API = "https://blog.smartcardeals.net/wp-json/wp/v2/posts";
const CAR_IMAGES = [
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=85",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=85",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=85",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85",
  "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=1200&q=85",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=85",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=85",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85",
  "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1200&q=85",
];

function decodeHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function imageFor(post: WordPressPost, index: number) {
  if (post.slug === "turn-your-car-into-cash-before-your-coffee-cools-%e2%98%95") {
    return "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85";
  }

  const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const embedded = post.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  if (featured || embedded) return featured || embedded || CAR_IMAGES[index % CAR_IMAGES.length];

  let hash = 0;
  for (const character of post.title.rendered) hash = character.charCodeAt(0) + ((hash << 5) - hash);
  return CAR_IMAGES[Math.abs(hash + post.id) % CAR_IMAGES.length];
}

function normalizePost(post: WordPressPost, index: number): BlogPost {
  const contentText = decodeHtml(post.content.rendered);
  const category = post._embedded?.["wp:term"]
    ?.flat()
    .find((term) => term.taxonomy === "category" && term.name !== "Uncategorized")?.name;

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtml(post.title.rendered),
    excerpt: decodeHtml(post.excerpt.rendered).replace(/\s*\[…\]$/, ""),
    date: new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    tag: category || "Selling Tips",
    readTime: `${Math.max(3, Math.ceil(contentText.split(/\s+/).length / 220))} min read`,
    image: imageFor(post, index),
    content: post.content.rendered,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${BLOG_API}?per_page=20&_embed`, { next: { revalidate: 3600 } });
  if (!response.ok) return [];
  const posts = (await response.json()) as WordPressPost[];
  return posts.map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const response = await fetch(`${BLOG_API}?slug=${encodeURIComponent(slug)}&_embed`, { next: { revalidate: 3600 } });
  if (!response.ok) return undefined;
  const posts = (await response.json()) as WordPressPost[];
  return posts[0] ? normalizePost(posts[0], 0) : undefined;
}

export async function getRelatedPosts(slug: string, count = 3): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}

export const tagColors: Record<string, string> = {
  "Selling Tips": "bg-blue/10 text-blue border-blue/20",
  "UAE Market": "bg-orange-50 text-orange-700 border-orange-200",
  "Car Guides": "bg-purple-50 text-purple-700 border-purple-200",
  News: "bg-green-50 text-green-700 border-green-200",
};
