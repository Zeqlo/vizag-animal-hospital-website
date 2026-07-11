import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/data/products"
import { Badge } from "@/components/ui/Badge"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <Badge variant="slate" className="mb-2 text-[10px] sm:text-xs">{product.category}</Badge>
        <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-[10px] sm:text-xs text-slate-500 mb-2 line-clamp-2 hidden sm:block">{product.description}</p>
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