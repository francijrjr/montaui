import * as React from "react"
import { cn } from "@/lib/utils"

export function Menubar({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-9 items-center space-x-1 rounded-lg border border-border bg-card p-1 shadow-sm relative", className)} {...props}>
      {children}
    </div>
  )
}

export function MenubarMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative inline-block">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
        }
        return child
      })}
    </div>
  )
}

export function MenubarTrigger({
  children,
  className,
  open,
  setOpen,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean; setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <button
      type="button"
      onClick={() => setOpen?.(!open)}
      className={cn(
        "flex cursor-pointer select-none items-center rounded px-3 py-1 text-xs font-semibold outline-none hover:bg-muted text-foreground transition-colors",
        open && "bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function MenubarContent({
  children,
  className,
  open,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { open?: boolean }) {
  if (!open) return null
  return (
    <div
      className={cn(
        "absolute left-0 mt-2 min-w-[12rem] z-50 rounded-xl border border-border bg-card p-1.5 text-foreground shadow-2xl space-y-0.5 text-xs animate-in fade-in zoom-in-95 duration-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MenubarItem({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium outline-none hover:bg-muted text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}