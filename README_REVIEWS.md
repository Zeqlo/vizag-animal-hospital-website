# Google Reviews Integration — Setup Guide

This document explains how to enable live Google Reviews on the Vizag Animal Hospital website using the **Google Places API**.

---

## 1. Get a Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services → Library**.
4. Search for and enable **Places API** (the new version is recommended: *Places API (New)*).
5. Go to **APIs & Services → Credentials**.
6. Click **Create Credentials → API Key**.
7. Copy the generated API key.
8. (Recommended) Restrict the API key to only the Places API and your domain(s) to prevent misuse.

> **Documentation:** https://developers.google.com/maps/documentation/places/web-service/overview

---

## 2. Find Your Clinic's Place ID

The **Place ID** is a unique identifier Google assigns to every business listing.

### Option A — Use the Place ID Finder (easiest)
1. Open the [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id).
2. Search for "Vizag Animal Hospital" (or your exact business name + city).
3. Click your business on the map.
4. Copy the Place ID shown (e.g. `ChIJabcdefg...`).

### Option B — Use Google Maps
1. Open [Google Maps](https://maps.google.com).
2. Search for your clinic.
3. Right-click on your business location on the map.
4. A small info card appears — the Place ID is in the URL or the info panel.
5. Alternatively, click **Share → Copy link** and look for the `place_id=` parameter.

### Option C — Use the Places API Find Place endpoint
You can also query the Find Place From Text endpoint with your business name and address to retrieve the Place ID programmatically.

> **Documentation:** https://developers.google.com/maps/documentation/places/web-service/place-id

---

## 3. Set Environment Variables

Create a `.env` file in the **project root** (next to `package.json`):

```bash
# Google Places API key (required for live reviews)
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here

# Google Place ID for the clinic (required for live reviews)
VITE_GOOGLE_PLACE_ID=your_place_id_here
```

> ⚠️ **Important:** All variables exposed to the client via Vite **must** be prefixed with `VITE_`. Without this prefix, they won't be available in the browser.

Restart your dev server after creating or editing `.env`:

```bash
npm run dev
```

---

## 4. How the Fallback Works

The `GoogleReviews` component (`src/components/common/GoogleReviews.tsx`) is designed to **never crash**:

| Scenario | Behavior |
|---|---|
| **No API key set** | Silently falls back to the existing testimonials from `@/data/testimonials` — no error shown |
| **API key set but fetch fails** | Shows an amber warning message, then renders the fallback testimonials below it |
| **API key set and fetch succeeds** | Displays live Google reviews with star ratings, reviewer photos, and a "Powered by Google" badge |

Because the `VITE_GOOGLE_PLACES_API_KEY` environment variable is likely **not set** during local development, the component will automatically display the existing testimonials from `src/data/testimonials.ts` — the same testimonials shown on the Home page's "What Pet Parents Say" section.

This means the component works out of the box with no configuration. Adding an API key simply upgrades it to show real Google reviews.

---

## 5. Pricing & Billing

The Google Places API is **not free indefinitely**, but it has a generous free tier:

### Free Tier (as of 2025)
- **$200 USD/month** Google Maps Platform credit automatically applied to all accounts.
- Place Details calls cost approximately **$5 per 1,000 requests** (varies by fields requested).
- With the $200 monthly credit, you get roughly **40,000 Place Details calls per month for free**.

### Billing Setup Required
- You **must** enable billing (link a credit card) in the Google Cloud Console, even though the free credit covers most usage.
- If your usage exceeds the monthly credit, you'll be charged for the overage.
- **Recommendation:** Restrict your API key to your production domain only to prevent unauthorized use.

### Cost Control Tips
- Only request the fields you need (we already limit to `name, rating, user_ratings_total, reviews`).
- The reviews component fetches **once per page load** — not on a polling interval.
- Consider caching the API response server-side for production to reduce calls.

> **Pricing details:** https://developers.google.com/maps/documentation/places/web-service/usage-and-billing

---

## 6. Component Usage

The `GoogleReviews` component is already added to the Home page as a "What People Say" section, appearing right after the existing testimonials section.

You can also use it on other pages:

```tsx
import { GoogleReviews } from "@/components/common/GoogleReviews"

// Basic usage (uses env vars)
<GoogleReviews />

// With explicit Place ID and review limit
<GoogleReviews placeId="ChIJabcdefg..." maxReviews={9} />
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeId` | `string` | `import.meta.env.VITE_GOOGLE_PLACE_ID` | The Google Place ID for your business |
| `maxReviews` | `number` | `6` | Maximum number of reviews to display |

---

## 7. Notes & Security

- The API key is **client-side** (exposed in network requests). This is standard for the Places API when used in a frontend app.
- **Always restrict** your API key in the Google Cloud Console to:
  - Your production domain (HTTP referrer restriction)
  - The Places API only (API restriction)
- For higher security, consider proxying requests through your own backend server.
- The component does **not** use `any` types — all API responses are typed with proper TypeScript interfaces.