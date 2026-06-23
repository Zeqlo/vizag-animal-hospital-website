import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Service } from "@/data/services"
import { Badge } from "@/components/ui/Badge"

interface ServiceCardProps {
  service: Service
  index?: number
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const IconComponent = (Icons as unknown as Record<string, LucideIcon>)[service.icon] || (Icons.Stethoscope as LucideIcon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group block bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 h-full"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center mb-4 group-hover:from-ocean-700 group-hover:to-ocean-900 transition-all duration-200">
          <IconComponent className="h-7 w-7 text-ocean-700 group-hover:text-white transition-colors" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={service.category === "veterinary" ? "ocean" : service.category === "grooming" ? "coral" : "green"}>
            {service.category}
          </Badge>
          {service.comingSoon && (
            <Badge variant="coral">Coming Soon</Badge>
          )}
        </div>
        <h3 className="text-lg font-heading font-bold text-slate-900 mb-2 group-hover:text-ocean-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{service.shortDescription}</p>
        <span className="text-sm font-medium text-ocean-700 group-hover:underline">Learn more →</span>
      </Link>
    </motion.div>
  )
}