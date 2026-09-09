"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-semibold transition-all select-none relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:scale-[0.99] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#753399] text-white shadow-[0_2px_8px_rgba(117,51,153,0.35)] hover:bg-[#632982] hover:shadow-[0_5px_16px_rgba(117,51,153,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#52206d] dark:bg-[#8b3fb5] dark:hover:bg-[#753399]",
        secondary: "bg-background text-foreground border border-input shadow-sm hover:border-[#753399] hover:bg-[#753399]/10 hover:text-[#753399] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(117,51,153,0.12)] active:translate-y-0 active:bg-[#753399]/20",
        ghost: "text-[#753399] bg-transparent hover:bg-[#753399]/10 active:bg-[#753399]/20 dark:text-[#a855f7] dark:hover:bg-[#a855f7]/10",
        danger: "bg-[#c83c4d] text-white shadow-[0_2px_8px_rgba(200,60,77,0.3)] hover:bg-[#b52e3e] hover:shadow-[0_5px_16px_rgba(200,60,77,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#9e2332]",
        dangerGhost: "text-[#c83c4d] border border-[#c83c4d] bg-transparent hover:bg-[#c83c4d]/10 active:bg-[#c83c4d]/20",
        success: "bg-[#168862] text-white shadow-[0_2px_8px_rgba(22,136,98,0.3)] hover:bg-[#116f4f] hover:shadow-[0_5px_16px_rgba(22,136,98,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#0d593f]",
        link: "text-[#753399] underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[42px] px-5 py-2 [&_svg]:size-4",
        xs: "min-h-[28px] px-2.5 py-1 text-[11px] rounded gap-1 [&_svg]:size-3",
        sm: "min-h-[34px] px-3.5 py-1.5 text-xs rounded-sm gap-1.5 [&_svg]:size-3.5",
        lg: "min-h-[50px] px-7 py-3 text-[15px] font-bold rounded-lg gap-2.5 [&_svg]:size-4.5",
        icon: "h-[42px] w-[42px] p-0 [&_svg]:size-4",
        iconSm: "h-[34px] w-[34px] p-0 [&_svg]:size-3.5",
        iconLg: "h-[50px] w-[50px] p-0 [&_svg]:size-4.5",
      },
      fullWidth: { true: "w-full" }
    },
    defaultVariants: { variant: "default", size: "default", fullWidth: false }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 size-4" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }