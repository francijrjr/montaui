import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn("space-y-6 w-full", className)} {...props}>
      {children}
    </form>
  )
}

export function FormHeader({
  title,
  description,
  badge,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
  badge?: React.ReactNode
}) {
  return (
    <div className={cn("border-b border-border pb-4 flex items-center justify-between gap-4", className)} {...props}>
      <div className="space-y-1">
        {title && <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {badge}
    </div>
  )
}

export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h4>}
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export function FormRow({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)} {...props}>
      {children}
    </div>
  )
}

export function FormDivider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-border my-6", className)} {...props} />
}

export function FormActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-end gap-3 pt-4 border-t border-border", className)} {...props}>
      {children}
    </div>
  )
}