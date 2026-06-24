/**
 * GoogleReviews Component
 *
 * Fetches and displays Google reviews for the clinic using the Google Places API.
 *
 * Setup:
 * 1. Get a Google Places API key from the Google Cloud Console:
 *    https://console.cloud.google.com/google/maps-apis/credentials
 * 2. Enable the "Places API (New)" or "Places API" for your project.
 * 3. Find your clinic's Place ID using the Place ID Finder:
 *    https://developers.google.com/maps/documentation/places/web-service/place-id
 *    or search Google Maps, right-click your business, and copy the Place ID.
 * 4. Set the API key in your .env file:
 *    VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
 *    VITE_GOOGLE_PLACE_ID=your_place_id_here  (optional, defaults to a placeholder)
 *
 * If the API key is not set, this component gracefully falls back to the
 * existing testimonials data from @/data/testimonials.
 */

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, Loader2, AlertCircle, ExternalLink } from "lucide-react"
import { testimonials as fallbackTestimonials, type Testimonial } from "@/data/testimonials"

/** A single Google review returned by the Places API (mapped to our shape). */
interface GoogleReview {
  authorName: string
  rating: number
  text: string
  relativeTime: string
  profilePhotoUrl?: string
}

/** Raw review object from the Google Places Details API. */
interface RawGoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url?: string
}

/** Response shape from the Google Places Details API (only fields we use). */
interface GooglePlacesResponse {
  result?: {
    name?: string
    rating?: number
    user_ratings_total?: number
    reviews?: RawGoogleReview[]
  }
  status?: string
  error_message?: string
}

type LoadState = "loading" | "loaded" | "error"

/** Props for the GoogleReviews component. */
interface GoogleReviewsProps {
  /** Optional Place ID override; otherwise reads from VITE_GOOGLE_PLACE_ID. */
  placeId?: string
  /** Optional limit on number of reviews to display (default 6). */
  maxReviews?: number
}

const DEFAULT_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID ?? ""
const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY ?? ""

/** Maps a raw Google Places API review to our internal GoogleReview interface. */
function mapGoogleReview(raw: RawGoogleReview): GoogleReview {
  return {
    authorName: raw.author_name,
    rating: raw.rating,
    text: raw.text,
    relativeTime: raw.relative_time_description,
    profilePhotoUrl: raw.profile_photo_url,
  }
}

export function GoogleReviews({ placeId = DEFAULT_PLACE_ID, maxReviews = 6 }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [businessName, setBusinessName] = useState<string>("")
  const [totalRatings, setTotalRatings] = useState<number>(0)
  const [avgRating, setAvgRating] = useState<number>(0)
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [usingGoogle, setUsingGoogle] = useState<boolean>(false)

  useEffect(() => {
    // If no API key or Place ID, fall back to local testimonials immediately.
    if (!API_KEY || !placeId) {
      setLoadState("loaded")
      setUsingGoogle(false)
      return
    }

    let cancelled = false

    async function fetchReviews() {
      try {
        setLoadState("loading")
        const fields = "name,rating,user_ratings_total,reviews"
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
          placeId
        )}&fields=${fields}&key=${encodeURIComponent(API_KEY)}`

        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }

        const data: GooglePlacesResponse = await res.json()

        if (cancelled) return

        if (data.status !== "OK" || !data.result) {
          throw new Error(data.error_message ?? data.status ?? "Unknown API error")
        }

        const mapped: GoogleReview[] = (data.result.reviews ?? [])
          .map(mapGoogleReview)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, maxReviews)

        setReviews(mapped)
        setBusinessName(data.result.name ?? "")
        setTotalRatings(data.result.user_ratings_total ?? 0)
        setAvgRating(data.result.rating ?? 0)
        setUsingGoogle(true)
        setLoadState("loaded")
      } catch (err) {
        if (cancelled) return
        setErrorMessage(err instanceof Error ? err.message : "Failed to fetch reviews")
        setLoadState("error")
        setUsingGoogle(false)
      }
    }

    fetchReviews()

    return () => {
      cancelled = true
    }
  }, [placeId, maxReviews])

  // ----- Loading state -----
  if (loadState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
        <p className="mt-4 text-sm text-slate-500">Loading reviews…</p>
      </div>
    )
  }

  // ----- Error state: fall back to local testimonials so users still see content -----
  if (loadState === "error") {
    return (
      <div>
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <span>
            Couldn't load Google reviews ({errorMessage}). Showing our featured testimonials instead.
          </span>
        </div>
        <FallbackGrid testimonials={fallbackTestimonials.slice(0, maxReviews)} />
      </div>
    )
  }

  // ----- No API key: silently use fallback testimonials -----
  if (!usingGoogle) {
    return <FallbackGrid testimonials={fallbackTestimonials.slice(0, maxReviews)} />
  }

  // ----- Success: Google reviews -----
  return (
    <div>
      {/* Summary header */}
      {avgRating > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(avgRating)
                      ? "h-5 w-5 text-amber-400 fill-amber-400"
                      : "h-5 w-5 text-slate-300"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">{avgRating.toFixed(1)}</span>
            <span className="text-sm text-slate-500">({totalRatings} Google reviews)</span>
          </div>
          {businessName && (
            <span className="text-sm text-slate-600">
              for <span className="font-medium text-slate-800">{businessName}</span>
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={`${review.authorName}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-4 w-4 text-amber-400 fill-amber-400"
                        : "h-4 w-4 text-slate-300"
                    }
                  />
                ))}
              </div>
              <Quote className="h-8 w-8 text-ocean-100" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-4">
              {review.text}
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              {review.profilePhotoUrl ? (
                <img
                  src={review.profilePhotoUrl}
                  alt={review.authorName}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-ocean-100 text-ocean-700 flex items-center justify-center font-semibold text-sm">
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900 text-sm">{review.authorName}</p>
                <p className="text-xs text-slate-500">{review.relativeTime}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Powered by Google badge */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <span className="text-xs text-slate-400">Powered by</span>
        <span className="text-sm font-medium text-slate-700">
          <span className="font-semibold">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-amber-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </span>
        </span>
        <a
          href={`https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-ocean-600 hover:text-ocean-700 transition-colors"
        >
          View all reviews
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

/** Renders fallback testimonials in the same card layout. */
function FallbackGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < testimonial.rating
                      ? "h-4 w-4 text-amber-400 fill-amber-400"
                      : "h-4 w-4 text-slate-300"
                  }
                />
              ))}
            </div>
            <Quote className="h-8 w-8 text-ocean-100" />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-4">
            "{testimonial.text}"
          </p>
          <div className="pt-4 border-t border-slate-100">
            <p className="font-semibold text-slate-900 text-sm">{testimonial.ownerName}</p>
            <p className="text-xs text-slate-500">
              {testimonial.petName} ({testimonial.petType})
            </p>
            <p className="text-xs text-ocean-600 font-medium mt-1">{testimonial.service}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default GoogleReviews