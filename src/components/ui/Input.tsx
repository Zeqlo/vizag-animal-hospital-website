import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type LabelHTMLAttributes, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent",
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-300 focus:ring-ocean-500",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent resize-none",
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-300 focus:ring-ocean-500",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent",
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-300 focus:ring-ocean-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={cn("block text-sm font-medium text-slate-700 mb-1.5", className)} {...props}>
      {children}
    </label>
  )
}

interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

export function FieldError({ className, children, ...props }: FieldErrorProps) {
  if (!children) return null
  return (
    <p className={cn("mt-1 text-sm text-red-500", className)} {...props}>
      {children}
    </p>
  )
}