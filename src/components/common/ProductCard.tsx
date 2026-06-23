import { motion } from "framer-motion"
import { Star, ShoppingBag } from "lucide-react"
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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2">
            <Badge variant="coral">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <Badge variant="slate" className="mb-2">{product.category}</Badge>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs text-slate-600">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ocean-700 text-white text-xs font-semibold hover:bg-ocean-800 transition-colors active:scale-95"
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}