import JsonLd from "@/components/JsonLd";
import { getGoogleReviews, GOOGLE_REVIEWS_URL } from "@/lib/googleReviews";
import { BUSINESS_ID } from "@/lib/schema";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#F5B400]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue to-[#4C8BF7] text-white font-bold flex items-center justify-center text-base shrink-0">
      {initial}
    </div>
  );
}

export default async function GoogleReviewsSection() {
  const { reviews, overallRating, totalReviews } = await getGoogleReviews(3);

  if (reviews.length === 0) return null;

  const placeId = process.env.GOOGLE_PLACE_ID;
  const reviewsUrl = placeId
    ? `https://search.google.com/local/reviews?placeid=${placeId}`
    : GOOGLE_REVIEWS_URL;

  const reviewJsonLd =
    overallRating && totalReviews
      ? {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": BUSINESS_ID,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: overallRating,
            reviewCount: totalReviews,
          },
        }
      : null;

  return (
    <section id="reviews" className="bg-light-bg py-20 lg:py-24 px-6">
      {reviewJsonLd && <JsonLd data={reviewJsonLd} />}
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue/10 text-blue text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 rounded-full border border-blue/15 mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-navy tracking-tight mb-3">
            What Our Customers Say
          </h2>
          {overallRating && totalReviews ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-text">
              <Stars rating={overallRating} />
              <span className="font-bold text-navy">{overallRating.toFixed(1)}</span>
              <span>· {totalReviews.toLocaleString()} Google reviews</span>
            </div>
          ) : (
            <p className="text-gray-text max-w-[540px] mx-auto leading-7">
              Real feedback from UAE car owners who sold with Smart Car Deals.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.slice(0, 6).map((r, i) => (
            <div
              key={`${r.authorName}-${i}`}
              className="bg-white rounded-[20px] p-6 border-[1.5px] border-border shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={r.authorName} />
                <div>
                  <div className="text-sm font-bold text-navy">{r.authorName}</div>
                  {r.relativeTime && (
                    <div className="text-xs text-gray-text">{r.relativeTime}</div>
                  )}
                </div>
              </div>
              <Stars rating={r.rating} />
              <p className="text-sm text-gray-text leading-6 mt-3">&quot;{r.text}&quot;</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue rounded-xl font-bold text-sm border-2 border-blue hover:bg-blue hover:text-white transition-all"
          >
            Read All Reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
