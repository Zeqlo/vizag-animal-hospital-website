import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import type { Testimonial } from "@/data/testimonials"
import { formatDate } from "@/lib/utils"

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
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
              className={i < testimonial.rating ? "h-4 w-4 text-amber-400 fill-amber-400" : "h-4 w-4 text-slate-300"}
            />
          ))}
        </div>
        <Quote className="h-8 w-8 text-ocean-100" />
      </div>
      <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-4">"{testimonial.text}"</p>
      <div className="pt-4 border-t border-slate-100">
        <p className="font-semibold text-slate-900">{testimonial.ownerName}</p>
        <p className="text-xs text-slate-500">
          {testimonial.petName ? `${testimonial.petName} (${testimonial.petType}) • ` : ""}{formatDate(testimonial.date)}
        </p>
        <p className="text-xs text-ocean-600 font-medium mt-1">{testimonial.service}</p>
      </div>
    </motion.div>
  )
}