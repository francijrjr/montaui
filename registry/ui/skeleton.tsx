import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rectangle" | "circle" | "rounded"
}

export function Skeleton({ className, shape = "rounded", ...props }: SkeletonProps) {
  const shapeClass = {
    rectangle: "rounded-none",
    rounded: "rounded-md",
    circle: "rounded-full"
  }[shape]

  return (
    <div
      className={cn("animate-pulse bg-muted/70", shapeClass, className)}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : i === 0 ? "w-full" : "w-5/6")}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = "default", className }: { size?: "sm" | "default" | "lg"; className?: string }) {
  const sizeClass = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-14 w-14"
  }[size]

  return <Skeleton shape="circle" className={cn(sizeClass, "shrink-0", className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <Skeleton className="h-7 w-20 rounded-md" />
        <Skeleton className="h-7 w-28 rounded-md" />
      </div>
    </div>
  )
}