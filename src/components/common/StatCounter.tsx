import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
  index?: number
}

export function StatCounter({ value, label, suffix = "", index = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2">
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <div className="text-sm sm:text-base text-ocean-100">{label}</div>
    </motion.div>
  )
}