import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean
  disabled?: boolean
}

export function Field({ className, error, disabled, children, ...props }: FieldProps) {
  return (
    <div
      className={cn("space-y-1.5 w-full", disabled && "opacity-60 pointer-events-none", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function FieldLabel({ className, required, children, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn(
        "text-xs font-semibold text-foreground flex items-center gap-1 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 font-bold">*</span>}
    </label>
  )
}

export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[11px] text-muted-foreground leading-relaxed", className)} {...props} />
  )
}

export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null
  return (
    <p
      role="alert"
      className={cn("text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 animate-in fade-in-0 duration-150", className)}
      {...props}
    >
      {children}
    </p>
  )
}