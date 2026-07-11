import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div className={cn(center && "text-center", "mb-12", className)} {...props}>
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-sm font-semibold uppercase tracking-wider mb-3",
            light ? "text-coral-300" : "text-coral-500"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-balance break-words",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg max-w-2xl",
            center && "mx-auto",
            light ? "text-ocean-100" : "text-slate-600",
            "break-words"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}