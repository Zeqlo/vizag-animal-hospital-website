import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: string
}

const SITE_URL = 'https://vizag-animal-hospital.in'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export function Seo({ title, description, path, image, type = 'website' }: SeoProps) {
  const url = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Vizag Animal Hospital & Store" />
      <meta property="og:locale" content="en_IN" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}