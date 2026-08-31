import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  indeterminate?: boolean
  showValue?: boolean
  label?: string
  indicatorClassName?: string
}

const variantColors = {
  default: "bg-[#753399]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  info: "bg-sky-500"
}

const sizeHeights = {
  xs: "h-1",
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-3.5",
  xl: "h-4"
}

export function Progress({
  className,
  value = 0,
  max = 100,
  variant = "default",
  size = "default",
  indeterminate = false,
  showValue = false,
  label,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full space-y-1.5 select-none", className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && (
            <span className="font-mono text-[11px] text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative w-full overflow-hidden rounded-full bg-muted", sizeHeights[size])}
      >
        {indeterminate ? (
          <div
            className={cn(
              "absolute h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]",
              variantColors[variant],
              indicatorClassName
            )}
          />
        ) : (
          <div
            className={cn("h-full rounded-full transition-all duration-300", variantColors[variant], indicatorClassName)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
}