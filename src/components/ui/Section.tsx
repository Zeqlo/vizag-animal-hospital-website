import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bg?: "white" | "slate" | "ocean" | "coral" | "gradient"
}

const bgClasses = {
  white: "bg-white",
  slate: "bg-slate-50",
  ocean: "bg-ocean-50",
  coral: "bg-coral-50",
  gradient: "bg-gradient-to-br from-ocean-50 via-white to-coral-50",
}

export function Section({ className, bg = "white", children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", bgClasses[bg], className)} {...props}>
      {children}
    </section>
  )
}