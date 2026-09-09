"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, defaultChecked, onChange, disabled, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false)
    const effectiveChecked = checked !== undefined ? checked : isChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setIsChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={effectiveChecked}
            onChange={handleChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={inputId}
            aria-hidden="true"
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-input transition-all cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[#753399]",
              effectiveChecked ? "bg-[#753399] border-[#753399] text-white shadow-sm" : "bg-background hover:border-[#753399]",
              disabled && "cursor-not-allowed opacity-50",
              className
            )}
          >
            {effectiveChecked && <Check className="h-3 w-3 stroke-[3]" />}
          </label>
        </div>
        {(label || description) && (
          <div className="grid gap-0.5 leading-none">
            {label && (
              <label htmlFor={inputId} className={cn("text-xs font-semibold text-foreground cursor-pointer select-none", disabled && "cursor-not-allowed opacity-50")}>
                {label}
              </label>
            )}
            {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }