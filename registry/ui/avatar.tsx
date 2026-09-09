"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  status?: "online" | "offline" | "busy"
  size?: "sm" | "default" | "lg"
}

export function Avatar({ src, alt = "", fallback, status, size = "default", className, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(!src)

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    default: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  return (
    <div className={cn("relative inline-flex shrink-0 select-none items-center justify-center rounded-full bg-muted font-heading font-bold uppercase text-foreground overflow-hidden border border-border", sizeClasses[size], className)} {...props}>
      {src && !hasError ? (
        <img src={src} alt={alt} onError={() => setHasError(true)} className="h-full w-full object-cover" />
      ) : (
        <span>{fallback || alt.slice(0, 2) || "MU"}</span>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
            status === "online" && "bg-emerald-500",
            status === "offline" && "bg-zinc-400",
            status === "busy" && "bg-rose-500"
          )}
        />
      )}
    </div>
  )
}