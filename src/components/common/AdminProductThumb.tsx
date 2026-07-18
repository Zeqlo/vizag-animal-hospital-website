import { useState, useRef, useEffect } from "react"
import { ShoppingBag } from "lucide-react"

interface AdminProductThumbProps {
  productId: number
  productName: string
  fallbackImage?: string
}

/**
 * Lazy-loading thumbnail for admin product list.
 * Fetches the product image on demand via /api/products?id=<id> when the
 * thumbnail scrolls into view. The main /api/products list endpoint returns
 * metadata only (no image data) to avoid Supabase statement timeouts.
 */
export function AdminProductThumb({ productId, productName, fallbackImage }: AdminProductThumbProps) {
  const [image, setImage] = useState<string>(fallbackImage || "")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fallbackImage) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [fallbackImage])

  useEffect(() => {
    if (!inView || image) return

    let cancelled = false
    fetch(`/api/products?id=${productId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.image) setImage(data.image)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [inView, image, productId])

  return (
    <div ref={ref} className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
      {image ? (
        <img src={image} alt={productName} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ShoppingBag className="h-5 w-5 text-slate-300" />
        </div>
      )}
    </div>
  )
}