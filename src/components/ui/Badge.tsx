import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "ocean" | "coral" | "slate" | "green" | "amber"
}

const variants = {
  ocean: "bg-ocean-100 text-ocean-700",
  coral: "bg-coral-100 text-coral-700",
  slate: "bg-slate-100 text-slate-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
}

export function Badge({ variant = "ocean", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}