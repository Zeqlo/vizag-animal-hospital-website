import { useState, useRef, useEffect, forwardRef } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  id?: string
  value: string // yyyy-mm-dd format (what the form stores)
  onChange: (value: string) => void
  min?: string // yyyy-mm-dd format
  error?: boolean
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const TODAY = new Date()
TODAY.setHours(0, 0, 0, 0)

function toYMD(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function parseYMD(s: string): Date | null {
  if (!s) return null
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  return new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]))
}

function toDDMMYYYY(s: string): string {
  if (!s) return ""
  const d = parseYMD(s)
  if (!d) return ""
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ id, value, onChange, min, error }, _ref) => {
    const [open, setOpen] = useState(false)
    const [viewMonth, setViewMonth] = useState(() => {
      const d = parseYMD(value) ?? new Date()
      return new Date(d.getFullYear(), d.getMonth(), 1)
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const minDate = min ? parseYMD(min) : null

    // Close when clicking outside
    useEffect(() => {
      function handleClick(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      if (open) {
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
      }
    }, [open])

    // When opening, jump to the selected month or current month
    useEffect(() => {
      if (open) {
        const d = parseYMD(value) ?? new Date()
        setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1))
      }
    }, [open])

    const selectedDate = parseYMD(value)

    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate()
    const firstDayOfWeek = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay()

    const prevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
    const nextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))

    const handleSelect = (day: number) => {
      const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
      onChange(toYMD(d))
      setOpen(false)
    }

    const isDisabled = (day: number): boolean => {
      if (!minDate) return false
      const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
      d.setHours(0, 0, 0, 0)
      return d < minDate
    }

    const isSelected = (day: number): boolean => {
      if (!selectedDate) return false
      return (
        selectedDate.getFullYear() === viewMonth.getFullYear() &&
        selectedDate.getMonth() === viewMonth.getMonth() &&
        selectedDate.getDate() === day
      )
    }

    const isToday = (day: number): boolean => {
      return (
        TODAY.getFullYear() === viewMonth.getFullYear() &&
        TODAY.getMonth() === viewMonth.getMonth() &&
        TODAY.getDate() === day
      )
    }

    // Can we go to previous month?
    const prevMonthDisabled = minDate
      ? new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0) < minDate
      : false

    return (
      <div ref={containerRef} className="relative">
        <input
          id={id}
          type="text"
          readOnly
          value={toDDMMYYYY(value)}
          placeholder="dd/mm/yyyy"
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer",
            error
              ? "border-red-400 focus:ring-red-500"
              : "border-slate-300 focus:ring-ocean-500"
          )}
        />
        <Calendar
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
        />

        {open && (
          <div className="absolute z-50 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-72">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                disabled={prevMonthDisabled}
                className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-semibold text-slate-900 text-sm">
                {MONTH_NAMES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-lg hover:bg-slate-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const disabled = isDisabled(day)
                const selected = isSelected(day)
                const today = isToday(day)
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !disabled && handleSelect(day)}
                    disabled={disabled}
                    className={cn(
                      "h-8 w-8 rounded-lg text-sm transition-colors mx-auto",
                      disabled && "text-slate-200 cursor-not-allowed",
                      !disabled && !selected && "text-slate-700 hover:bg-ocean-100",
                      selected && "bg-ocean-600 text-white font-semibold hover:bg-ocean-700",
                      !selected && today && "ring-1 ring-ocean-400 font-semibold text-ocean-700"
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"