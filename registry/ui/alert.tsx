import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 shadow-sm transition-all flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        brand: "border-[#753399]/40 bg-[#753399]/10 text-[#753399] dark:text-purple-300",
        success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300",
        destructive: "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300",
        info: "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const alertIcons = {
  default: <Info className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />,
  brand: <Info className="h-5 w-5 shrink-0 text-[#753399] dark:text-purple-300 mt-0.5" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />,
  destructive: <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />,
  info: <Info className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  dismissable?: boolean
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, dismissable = false, onClose, children, ...props }, ref) => {
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {icon !== undefined ? icon : alertIcons[variant || "default"]}
        <div className="flex-1 space-y-1">{children}</div>
        {dismissable && (
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("font-heading font-bold text-xs leading-none tracking-tight text-foreground", className)} {...props} />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs leading-relaxed text-muted-foreground", className)} {...props} />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }