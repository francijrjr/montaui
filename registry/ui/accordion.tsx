"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  activeItem: string | null
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>
}

const AccordionContext = React.createContext<AccordionContextType | null>(null)

export function Accordion({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={cn("divide-y divide-border rounded-xl border border-border bg-card", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  return (
    <div className={cn("border-b border-border last:border-b-0", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value })
        }
        return child
      })}
    </div>
  )
}

export function AccordionTrigger({
  value,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }) {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.activeItem === value

  return (
    <button
      type="button"
      onClick={() => context?.setActiveItem(isOpen ? null : value || null)}
      className={cn(
        "flex w-full items-center justify-between p-4 text-xs font-semibold text-foreground transition-all hover:bg-muted/50",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  )
}

export function AccordionContent({
  value,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value?: string }) {
  const context = React.useContext(AccordionContext)
  if (context?.activeItem !== value) return null

  return (
    <div className={cn("p-4 pt-0 text-xs text-muted-foreground animate-in fade-in-50 duration-150", className)} {...props}>
      {children}
    </div>
  )
}