export type GoogleReview = {
  authorName: string;
  rating: number;
  relativeTime: string;
  text: string;
};

export type GoogleReviewsResult = {
  reviews: GoogleReview[];
  overallRating: number | null;
  totalReviews: number | null;
  /** True only for a fresh Places API fetch — false for the curated snapshot below, even though its numbers are real. */
  isLive: boolean;
};

const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

// Resolved from the business's share.google link → its Google Knowledge Graph ID. Opens the
// same reviews panel directly, without needing a Places API place_id.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Smart+Car+Deals&kgmid=/g/11ygq96cth";

// Copied by hand from the live Google Business Profile (4.6★, 72 reviews) — kept here until
// GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID are configured. Only 3★+ reviews included; text is
// trimmed to the last full sentence before Google's own "…More" truncation, never rephrased.
// Re-copy periodically so this doesn't drift from the live listing.
const CURATED_SNAPSHOT_RATING = 4.6;
const CURATED_SNAPSHOT_TOTAL = 72;

// Same snapshot numbers, exported for spots on the site (e.g. a trust badge) that just need
// the headline rating/count without fetching or rendering the full review list.
export const GOOGLE_RATING_SNAPSHOT = {
  rating: CURATED_SNAPSHOT_RATING,
  total: CURATED_SNAPSHOT_TOTAL,
};
const CURATED_REVIEWS: GoogleReview[] = [
  {
    authorName: "Jean-Michel Terzian",
    rating: 5,
    relativeTime: "a month ago",
    text: "Frankly, I was just expecting another dealership to buy my car, but I was genuinely impressed by the exceptional level of service from start to finish.",
  },
  {
    authorName: "Ronald Ragadio",
    rating: 5,
    relativeTime: "2 months ago",
    text: "I recently sold my car to Smart Car Deals and had a very smooth experience. Mr. Ehab and Mr. Amr were very helpful throughout the entire process, from inspection and paperwork until the final cancellation of the car under my name.",
  },
  {
    authorName: "Gavin Aspden",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Great service throughout the process. Fair price given for the car and very transparent about how they got to that price. All staff were very polite and explained what the process was at each stage. Overall, very satisfied indeed.",
  },
  {
    authorName: "Jennifer McGuire",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Smart Car Deals was very responsive and the experience was up front and thorough. They worked with me over the course of only a few days and I was able to receive the payout fast.",
  },
  {
    authorName: "Deepak C",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Selling my car through Smart Car Deals was a very smooth and hassle-free experience. They offered the best price compared to other buyers, and the entire process was quick and straightforward.",
  },
  {
    authorName: "Shahid Khan",
    rating: 5,
    relativeTime: "a month ago",
    text: "I had an excellent experience selling my car. The entire process was smooth, transparent, and completed professionally from start to finish.",
  },
];

export async function getGoogleReviews(minRating = 3): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      reviews: CURATED_REVIEWS.filter((r) => r.rating >= minRating),
      overallRating: CURATED_SNAPSHOT_RATING,
      totalReviews: CURATED_SNAPSHOT_TOTAL,
      isLive: false,
    };
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "reviews,rating,user_ratings_total",
    reviews_sort: "newest",
    key: apiKey,
  });

  try {
    const res = await fetch(`${PLACE_DETAILS_URL}?${params}`, {
      // Place Details is billed per call — a day-old rating/review list is fine for a homepage widget.
      next: { revalidate: 86400 },
    });
    const json = await res.json();

    if (json.status !== "OK") {
      console.error("Google Places Details error:", json.status, json.error_message);
      return {
        reviews: CURATED_REVIEWS.filter((r) => r.rating >= minRating),
        overallRating: CURATED_SNAPSHOT_RATING,
        totalReviews: CURATED_SNAPSHOT_TOTAL,
        isLive: false,
      };
    }

    type RawReview = {
      author_name: string;
      rating: number;
      relative_time_description: string;
      text: string;
    };
    const rawReviews: RawReview[] = json.result?.reviews ?? [];

    // The Places API only ever returns up to 5 of Google's "most relevant" reviews — there is no
    // pagination to fetch more, so this list is never the business's full review history.
    const reviews = rawReviews
      .filter((r) => r.rating >= minRating)
      .map((r) => ({
        authorName: r.author_name,
        rating: r.rating,
        relativeTime: r.relative_time_description,
        text: r.text,
      }));

    return {
      reviews,
      overallRating: json.result?.rating ?? null,
      totalReviews: json.result?.user_ratings_total ?? null,
      isLive: true,
    };
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return {
      reviews: CURATED_REVIEWS.filter((r) => r.rating >= minRating),
      overallRating: CURATED_SNAPSHOT_RATING,
      totalReviews: CURATED_SNAPSHOT_TOTAL,
      isLive: false,
    };
  }
}
