"use client"

import * as React from "react"
import { Check, Package, AlertTriangle, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type TimelineStatus = "completed" | "in-progress" | "warning" | "error" | "pending"

export interface TimelineItem {
  id?: string
  title: string
  description?: string
  time?: string
  status?: TimelineStatus
  icon?: React.ReactNode
  badge?: string
  children?: React.ReactNode
}

export function Timeline({ items, className, ...props }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={cn("relative space-y-6 ml-2", className)} {...props}>
      {items.map((item, idx) => {
        const status = item.status || "completed"
        const isLast = idx === items.length - 1

        return (
          <div key={item.id || idx} className="flex gap-4 items-start relative">
            {!isLast && <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-border -z-0" />}
            <div
              className={cn(
                "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm ring-4 ring-card",
                status === "completed" && "bg-emerald-600",
                status === "in-progress" && "bg-[#753399] ring-[#753399]/20 animate-pulse",
                status === "warning" && "bg-amber-500",
                status === "error" && "bg-rose-500",
                status === "pending" && "bg-muted text-muted-foreground border border-border"
              )}
            >
              {item.icon || (status === "completed" ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />)}
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={cn("font-heading text-xs font-bold", status === "in-progress" ? "text-[#753399]" : "text-foreground")}>
                  {item.title}
                </span>
                {item.time && <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>}
              </div>
              {item.description && <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>}
              {item.badge && <span className="inline-block rounded bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[10px] font-bold">{item.badge}</span>}
              {item.children}
            </div>
          </div>
        )
      })}
    </div>
  )
}