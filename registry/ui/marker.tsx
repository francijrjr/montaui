"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type MarkerVariant = "brand" | "success" | "warning" | "destructive" | "info"

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MarkerVariant
  label?: React.ReactNode
  tooltip?: React.ReactNode
  pulse?: boolean
  size?: "sm" | "default" | "lg"
}

const markerColors: Record<MarkerVariant, { bg: string; pulse: string }> = {
  brand: { bg: "bg-[#753399]", pulse: "bg-[#753399]/30" },
  success: { bg: "bg-emerald-600", pulse: "bg-emerald-500/30" },
  warning: { bg: "bg-amber-500", pulse: "bg-amber-500/30" },
  destructive: { bg: "bg-rose-600", pulse: "bg-rose-500/30" },
  info: { bg: "bg-sky-600", pulse: "bg-sky-500/30" }
}

const markerSizes = {
  sm: "h-5 w-5 text-[10px]",
  default: "h-7 w-7 text-xs",
  lg: "h-9 w-9 text-sm"
}

export function Marker({
  variant = "brand",
  label,
  tooltip,
  pulse = true,
  size = "default",
  className,
  ...props
}: MarkerProps) {
  const [open, setOpen] = React.useState(false)
  const color = markerColors[variant]

  return (
    <div
      className={cn("relative inline-flex flex-col items-center group cursor-pointer select-none", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {pulse && <span className={cn("absolute h-full w-full rounded-full animate-ping scale-150", color.pulse)} />}
        <div
          className={cn(
            "relative rounded-full text-white flex items-center justify-center font-bold shadow-lg border-2 border-background transition-transform group-hover:scale-110",
            color.bg,
            markerSizes[size]
          )}
        >
          {label}
        </div>
      </div>

      {tooltip && (open || undefined) && (
        <div className="absolute top-full mt-1 z-30 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="rounded-lg border border-border bg-card p-2 shadow-xl text-center whitespace-nowrap text-xs">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}