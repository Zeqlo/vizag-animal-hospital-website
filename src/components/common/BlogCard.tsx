import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import type { BlogPost } from "@/data/blogPosts"
import { Badge } from "@/components/ui/Badge"

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 h-full"
      >
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="coral">{post.category}</Badge>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{post.readTime}</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 group-hover:text-ocean-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}