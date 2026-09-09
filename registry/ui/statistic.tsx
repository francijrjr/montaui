"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
}

export function Statistic({ title, value, trend, trendLabel, icon, className, ...props }: StatisticProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        {icon && <div className="p-1 rounded-md bg-muted text-foreground">{icon}</div>}
      </div>
      <h3 className="font-heading text-2xl font-extrabold text-foreground">{value}</h3>
      {trend !== undefined && (
        <p className={cn("text-[11px] font-bold", isPositive ? "text-emerald-500" : "text-rose-500")}>
          {isPositive ? "+" : ""}{trend}% {trendLabel && <span className="font-normal text-muted-foreground">{trendLabel}</span>}
        </p>
      )}
    </div>
  )
}