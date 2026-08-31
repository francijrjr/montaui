import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavigationMenu({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
    </nav>
  )
}

export function NavigationMenuList({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props}>
      {children}
    </ul>
  )
}

export function NavigationMenuItem({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  const [open, setOpen] = React.useState(false)
  const itemRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <li ref={itemRef} className={cn("relative", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
        }
        return child
      })}
    </li>
  )
}

export function NavigationMenuTrigger({
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
        "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-3 text-xs font-semibold transition-colors hover:bg-muted hover:text-foreground",
        open && "bg-muted text-foreground",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
    </button>
  )
}

export function NavigationMenuContent({
  children,
  className,
  open,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { open?: boolean }) {
  if (!open) return null
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-card p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function NavigationMenuLink({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted", className)} {...props}>
      {children}
    </a>
  )
}