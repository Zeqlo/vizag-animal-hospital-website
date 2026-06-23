# Paws & Claws Veterinary Clinic & Pet Store Website

A fully functional, production-quality, multi-page website for a veterinary clinic and pet store located in Visakhapatnam (Vizag), India. Built with React 18, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite** as build tool
- **Tailwind CSS v3** with custom theme colors (ocean blue + coral accent)
- **React Router DOM v6** for multi-page routing
- **Framer Motion** for animations and page transitions
- **Lucide React** for icons
- **React Hook Form + Zod** for form validation (appointment booking)
- **Headless UI** for accessible interactive components (accordion, dialog)
- **react-helmet-async** for SEO meta tags

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at http://localhost:5173

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, featured services, why choose us, stats, team preview, testimonials, pet store highlight, emergency banner, CTA |
| `/about` | About | Clinic story, mission & vision, core values, facilities, certifications |
| `/services` | Services | Grid of all 8 veterinary services with pricing |
| `/services/:slug` | Service Detail | Detailed view of each service with features and booking CTA |
| `/store` | Pet Store | Product grid with category filter, featured products |
| `/book-appointment` | Book Appointment | Multi-group form with React Hook Form + Zod validation, success state |
| `/team` | Team | Veterinarian and support staff grids |
| `/gallery` | Gallery | Image grid with category filter and lightbox |
| `/testimonials` | Testimonials | Rating summary and client review cards |
| `/blog` | Blog | Article cards with category filter |
| `/blog/:slug` | Blog Detail | Full article with related posts |
| `/faq` | FAQ | Categorized accordion (18 FAQs) |
| `/contact` | Contact | Contact info, map embed, hours table, contact form |
| `*` | 404 | Pet-themed not found page |

## Design System

- **Primary**: Ocean Blue (`ocean-700` #0369a1 — `ocean-900` #0c4a6e)
- **Accent**: Coral (`coral-400` #fb7185 — `coral-500` #f43f5e)
- **Neutrals**: Slate gray scale
- **Typography**: Poppins (headings), Inter (body)
- **Gradients**: Ocean-to-coral diagonal gradients for heroes and CTAs

## Project Structure

```
paws-claws-website/
  src/
    main.tsx              # App entry point
    App.tsx               # Router setup
    index.css             # Tailwind + custom styles
    components/
      layout/             # Navbar, Footer, Layout, ScrollToTop
      ui/                 # Button, Card, Input, Section, Container, Badge, Accordion, SectionTitle
      common/             # ServiceCard, TeamMemberCard, TestimonialCard, ProductCard, BlogCard, StatCounter, EmergencyBanner
    pages/                # 14 page components
    data/                 # TypeScript data files (services, team, products, testimonials, blogPosts, faqs, clinicInfo)
    lib/                  # utils.ts (cn helper)
    hooks/                # useScrollToTop
  public/                 # favicon
```

## Customization

All content is in `src/data/` as typed TypeScript files:

- `clinicInfo.ts` — Clinic name, phone, address, hours, social links
- `services.ts` — Service list with pricing
- `team.ts` — Team members with qualifications
- `products.ts` — Pet store products
- `testimonials.ts` — Client reviews
- `blogPosts.ts` — Blog articles
- `faqs.ts` — FAQ items

Replace placeholder content with real data by editing these files. No component changes needed.

## Notes

- All images use Unsplash placeholder URLs — replace with real photos
- The appointment form is client-side only (console.log + 1.5s delay) — connect to a backend API by replacing the `onSubmit` handler
- Google Maps embed uses a generic Vizag location — update with exact clinic coordinates
- All phone numbers, email, and address are placeholders