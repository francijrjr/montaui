import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartType = "bar" | "area" | "line" | "donut" | "horizontal-bar"

export interface ChartDataPoint {
  label: string
  value: number
  target?: number
  color?: string
  percentage?: number
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ChartType
  data: ChartDataPoint[]
  title?: string
  description?: string
  color?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
}

export function Chart({
  type = "bar",
  data,
  title,
  description,
  color = "#753399",
  height = 180,
  showLegend = true,
  showGrid = true,
  className,
  ...props
}: ChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target || 0)), 1)
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className={cn("w-full rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm select-none", className)} {...props}>
      {(title || description) && (
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            {title && <h4 className="font-heading text-sm font-bold text-foreground">{title}</h4>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {type === "donut" && (
            <span className="font-mono text-xs font-bold text-foreground">Total: {totalValue.toLocaleString()}</span>
          )}
        </div>
      )}

      {/* 1. BAR CHART */}
      {type === "bar" && (
        <div className="pt-2 flex items-end justify-between gap-3 border-b border-border pb-2 px-1" style={{ height: `${height}px` }}>
          {data.map((item, idx) => {
            const heightPct = Math.round((item.value / maxValue) * 100)
            const targetPct = item.target ? Math.round((item.target / maxValue) * 100) : null
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end cursor-pointer">
                <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </span>
                <div className="w-full flex items-end justify-center gap-1 h-3/4">
                  <div
                    className="w-3/5 rounded-t transition-all group-hover:brightness-110 shadow-sm"
                    style={{ height: `${heightPct}%`, backgroundColor: item.color || color }}
                  />
                  {targetPct && (
                    <div
                      className="w-2/5 rounded-t bg-muted-foreground/20"
                      style={{ height: `${targetPct}%` }}
                    />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 2. AREA / LINE CHART */}
      {(type === "area" || type === "line") && (
        <div className="relative w-full pt-2" style={{ height: `${height}px` }}>
          <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            {showGrid && (
              <>
                <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
                <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
                <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
              </>
            )}
            {type === "area" && (
              <path
                d={`M 0,${160 - (data[0]?.value / maxValue) * 140} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 500},${160 - (d.value / maxValue) * 140}`).join(' ')} L 500,160 L 0,160 Z`}
                fill="url(#chartGradient)"
              />
            )}
            <path
              d={`M 0,${160 - (data[0]?.value / maxValue) * 140} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 500},${160 - (d.value / maxValue) * 140}`).join(' ')}`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {data.map((d, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * 500}
                cy={160 - (d.value / maxValue) * 140}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all"
              />
            ))}
          </svg>
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono px-1 border-t border-border pt-2">
            {data.map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </div>
      )}

      {/* 3. DONUT / PIE CHART */}
      {type === "donut" && (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4.5"/>
              {(() => {
                let accumulatedOffset = 0
                const colors = ["#753399", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"]
                return data.map((item, idx) => {
                  const pct = (item.value / totalValue) * 88
                  const itemColor = item.color || colors[idx % colors.length]
                  const offset = accumulatedOffset
                  accumulatedOffset += pct
                  return (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={itemColor}
                      strokeWidth="4.5"
                      strokeDasharray={`${pct} 88`}
                      strokeDashoffset={-offset}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  )
                })
              })()}
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-heading text-base font-bold text-foreground">100%</span>
              <span className="text-[9px] text-muted-foreground uppercase font-semibold">Total</span>
            </div>
          </div>
          {showLegend && (
            <div className="space-y-2 flex-1 w-full max-w-xs">
              {data.map((item, idx) => {
                const colors = ["#753399", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"]
                const itemColor = item.color || colors[idx % colors.length]
                const pct = Math.round((item.value / totalValue) * 100)
                return (
                  <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: itemColor }} />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <span className="font-mono font-bold text-foreground">{pct}% <span className="text-muted-foreground font-normal">({item.value})</span></span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. HORIZONTAL BAR / RANKING */}
      {type === "horizontal-bar" && (
        <div className="space-y-3 pt-1">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / maxValue) * 100)
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground font-bold">{item.label}</span>
                  <span className="font-mono font-bold" style={{ color: item.color || color }}>{item.value} ({pct}%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: item.color || color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}