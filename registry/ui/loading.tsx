import * as React from "react"
import { cn } from "@/lib/utils"

export type LoadingVariant = "spinner" | "dots" | "pulse" | "bars" | "overlay"
export type LoadingSize = "xs" | "sm" | "default" | "lg" | "xl"

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoadingVariant
  size?: LoadingSize
  text?: string
  fullscreen?: boolean
}

const spinnerSizes: Record<LoadingSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
}

export function Spinner({ className, size = "default", ...props }: React.SVGAttributes<SVGSVGElement> & { size?: LoadingSize }) {
  return (
    <svg
      className={cn("animate-spin text-[#753399]", spinnerSizes[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce" />
    </div>
  )
}

export function LoadingBars({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-end gap-1 h-6", className)}>
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-3" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-6 [animation-delay:0.2s]" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-4 [animation-delay:0.4s]" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-5 [animation-delay:0.1s]" />
    </div>
  )
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex h-6 w-6 items-center justify-center", className)}>
      <span className="absolute h-full w-full animate-ping rounded-full bg-[#753399]/40" />
      <span className="relative h-3 w-3 rounded-full bg-[#753399]" />
    </div>
  )
}

export function LoadingOverlay({
  text = "Carregando dados...",
  subtext,
  className
}: {
  text?: string
  subtext?: string
  className?: string
}) {
  return (
    <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-card/85 backdrop-blur-sm animate-in fade-in-0 duration-150 select-none", className)}>
      <Spinner size="lg" />
      <div className="text-center space-y-0.5">
        <p className="text-xs font-bold text-foreground">{text}</p>
        {subtext && <p className="text-[10px] text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  )
}

export function Loading({
  variant = "spinner",
  size = "default",
  text,
  fullscreen = false,
  className,
  children,
  ...props
}: LoadingProps) {
  const content = (
    <div className={cn("inline-flex flex-col items-center justify-center gap-2", className)} {...props}>
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "dots" && <LoadingDots />}
      {variant === "bars" && <LoadingBars />}
      {variant === "pulse" && <LoadingPulse />}
      {variant === "overlay" && <LoadingOverlay text={text} />}
      {text && variant !== "overlay" && (
        <span className="text-xs font-medium text-muted-foreground">{text}</span>
      )}
      {children}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in-0">
        {content}
      </div>
    )
  }

  return content
}