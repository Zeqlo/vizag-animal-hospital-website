import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, ImageIcon } from "lucide-react"
import type { Product } from "@/data/products"
import { Badge } from "@/components/ui/Badge"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [image, setImage] = useState<string>(product.image || "")
  const [loading, setLoading] = useState(!product.image)
  const [inView, setInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Lazy-load image when card scrolls into view.
  // The /api/products list endpoint returns metadata only (no image data)
  // to avoid Supabase statement timeouts from transferring 126 MB of
  // base64 images. Each card fetches its own image on demand.
  useEffect(() => {
    if (product.image) {
      // Image already provided inline (e.g. from trash/admin view)
      return
    }

    const el = imgRef.current
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
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product.image, product.id])

  useEffect(() => {
    if (!inView || image) return

    let cancelled = false
    setLoading(true)
    fetch(`/api/products?id=${product.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.image) {
          setImage(data.image)
        }
      })
      .catch(() => {
        // Silent fail — placeholder stays
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [inView, image, product.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group"
    >
      <div
        ref={imgRef}
        className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300">
            <ImageIcon className="h-10 w-10" />
            {loading && (
              <span className="text-xs mt-1 text-slate-400">Loading…</span>
            )}
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <Badge variant="slate" className="mb-2 text-[10px] sm:text-xs">{product.category}</Badge>
        <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between gap-1">
          <span className="text-base sm:text-lg font-bold text-slate-900">₹{product.price}</span>
          <a
            href={`https://wa.me/919014176278?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name} (₹${product.price})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-ocean-700 text-white text-[10px] sm:text-xs font-semibold hover:bg-ocean-800 transition-colors active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  )
}