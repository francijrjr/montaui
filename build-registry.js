const fs = require('fs');
const path = require('path');

const REGISTRY_DIR = path.join(__dirname, 'registry');
const UI_DIR = path.join(REGISTRY_DIR, 'ui');
const JSON_DIR = path.join(REGISTRY_DIR, 'json');

[REGISTRY_DIR, UI_DIR, JSON_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// utils.ts
const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
fs.writeFileSync(path.join(REGISTRY_DIR, 'utils.ts'), utilsContent, 'utf-8');

const components = [
  // 1. AÇÕES & MENUS
  {
    name: "button",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
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

export { Button, buttonVariants }`
  },
  {
    name: "button-group",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, attached = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-center",
          attached &&
            "[&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:last-child)]:border-r-0",
          !attached && "gap-2",
          className
        )}
        {...props}
      />
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }`
  },
  {
    name: "dropdown-menu",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = React.createContext<DropdownContextType | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
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
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownContext)
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(!context.open)}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const context = React.useContext(DropdownContext)
  if (!context?.open) return null

  const alignmentClass =
    align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"

  return (
    <div
      className={cn(
        "absolute mt-2 min-w-[12rem] z-50 rounded-xl border border-border bg-card p-1.5 text-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-100",
        alignmentClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownContext)
  return (
    <button
      type="button"
      onClick={(e) => {
        context?.setOpen(false)
        onClick?.(e)
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors hover:bg-muted text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground font-mono", className)} {...props} />
}`
  },
  {
    name: "popover",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PopoverContext = React.createContext<PopoverContextType | null>(null)

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div ref={popoverRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

export function PopoverTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(PopoverContext)
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(!context.open)}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function PopoverContent({
  children,
  className,
  align = "center",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const context = React.useContext(PopoverContext)
  if (!context?.open) return null

  const alignmentClass =
    align === "end" ? "right-0" : align === "start" ? "left-0" : "left-1/2 -translate-x-1/2"

  return (
    <div
      className={cn(
        "absolute mt-2 z-50 w-72 rounded-xl border border-border bg-card p-4 text-foreground shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-100",
        alignmentClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}`
  },
  {
    name: "context-menu",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export function ContextMenu({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative", className)} {...props}>{children}</div>
}

export function ContextMenuTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>
}

export function ContextMenuContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-0.5", className)} {...props}>{children}</div>
}

export function ContextMenuItem({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors hover:bg-muted text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}`
  },
  {
    name: "menubar",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
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
}`
  },
  {
    name: "navigation-menu",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
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
}`
  },

  // 2. FORMULÁRIOS
  {
    name: "input",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Eye, EyeOff, X, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon: Icon, clearable = false, onClear, disabled, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative flex w-full items-center">
        {Icon && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground">
            <Icon className="size-4" />
          </div>
        )}
        <input
          type={inputType}
          className={cn(
            "flex min-h-[42px] w-full rounded-md border border-input bg-background px-3.5 py-2 text-[13px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-9",
            (clearable || isPassword) && "pr-9",
            className
          )}
          ref={ref}
          disabled={disabled}
          value={value}
          {...props}
        />
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        {clearable && !isPassword && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }`
  },
  {
    name: "textarea",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, showCount = false, value, onChange, ...props }, ref) => {
    const [count, setCount] = React.useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length)
      onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          onChange={handleChange}
          value={value}
          {...props}
        />
        {showCount && maxLength && (
          <div className="mt-1 flex justify-end text-[11px] font-mono text-muted-foreground">
            {count}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`
  },
  {
    name: "checkbox",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, defaultChecked, onChange, disabled, id, ...props }, ref) => {
    const inputId = id || React.useId()
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false)
    const effectiveChecked = checked !== undefined ? checked : isChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setIsChecked(e.target.checked)
      onChange?.(e)
    }

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={effectiveChecked}
            onChange={handleChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={() => {
              if (!disabled) {
                const newChecked = !effectiveChecked
                if (checked === undefined) setIsChecked(newChecked)
              }
            }}
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-input transition-all cursor-pointer",
              effectiveChecked ? "bg-[#753399] border-[#753399] text-white shadow-sm" : "bg-background hover:border-[#753399]",
              disabled && "cursor-not-allowed opacity-50",
              className
            )}
          >
            {effectiveChecked && <Check className="h-3 w-3 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <div className="grid gap-0.5 leading-none">
            {label && (
              <label htmlFor={inputId} className={cn("text-xs font-semibold text-foreground cursor-pointer select-none", disabled && "cursor-not-allowed opacity-50")}>
                {label}
              </label>
            )}
            {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }`
  },
  {
    name: "switch",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked)
    const effectiveChecked = checked !== undefined ? checked : isChecked

    const handleToggle = () => {
      if (disabled) return
      const next = !effectiveChecked
      if (checked === undefined) setIsChecked(next)
      onCheckedChange?.(next)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={effectiveChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          effectiveChecked ? "bg-[#753399]" : "bg-input",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
            effectiveChecked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }`
  },
  {
    name: "select",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-xs font-semibold text-foreground">{label}</label>}
        <div className="relative flex items-center">
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-xs shadow-sm transition-all focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399] disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
        </div>
        {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }`
  },

  // 3. ESTRUTURA & FEEDBACK
  {
    name: "card",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-heading text-lg font-bold leading-none tracking-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0 border-t border-border mt-4", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`
  },
  {
    name: "dialog",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = React.createContext<DialogContextType | null>(null)

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const nextValue = typeof next === "function" ? next(open) : next
      if (!isControlled) setUncontrolledOpen(nextValue)
      onOpenChange?.(nextValue)
    },
    [isControlled, onOpenChange, open]
  )

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext)
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(true)}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DialogContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DialogContext)
  if (!context?.open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200 p-4">
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => context.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-heading text-lg font-bold leading-none tracking-tight text-foreground", className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)} {...props} />
}

export { Dialog as Modal }`
  },
  {
    name: "badge",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#753399]/15 text-[#753399] dark:bg-[#753399]/30 dark:text-purple-300",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        warning: "border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400",
        destructive: "border-transparent bg-rose-500/15 text-rose-600 dark:text-rose-400",
        outline: "text-foreground border border-border bg-card",
        brand: "bg-[#753399] text-white shadow-sm hover:bg-[#622981]",
        ghost: "text-muted-foreground hover:bg-muted"
      },
      size: {
        sm: "px-2 py-0.2 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3.5 py-1 text-sm font-bold"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  dotColor?: string
  removable?: boolean
  onRemove?: (e: React.MouseEvent) => void
}

function Badge({
  className,
  variant,
  size,
  dot = false,
  dotColor,
  removable = false,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColor || "bg-current"
          )}
        />
      )}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 ml-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }`
  },
  {
    name: "alert",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
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

export { Alert, AlertTitle, AlertDescription, alertVariants }`
  },
  {
    name: "accordion",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
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
}`
  },
  {
    name: "tabs",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextType {
  activeTab: string
  setActiveTab: (val: string) => void
}

const TabsContext = React.createContext<TabsContextType | null>(null)

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string
  value?: string
  onValueChange?: (val: string) => void
}) {
  const [tab, setTab] = React.useState(defaultValue || "")
  const currentTab = value !== undefined ? value : tab

  const handleTabChange = (val: string) => {
    if (value === undefined) setTab(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab: handleTabChange }}>
      <div className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)} {...props}>
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext)
  const isActive = context?.activeTab === value

  return (
    <button
      type="button"
      onClick={() => context?.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm font-bold" : "hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext)
  if (context?.activeTab !== value) return null

  return (
    <div className={cn("outline-none animate-in fade-in duration-150", className)} {...props}>
      {children}
    </div>
  )
}`
  },
  {
    name: "toast",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastVariant = "default" | "success" | "destructive" | "warning" | "info"

export interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: ToastItem[]
  toast: (options: Omit<ToastItem, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((options: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = { ...options, id }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um <ToastProvider>")
  }
  return context
}

export function ToastViewport({
  toasts,
  onDismiss
}: {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <ToastCard key={t.id} item={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  )
}

const variantIcons = {
  default: <Info className="h-4 w-4 text-[#753399]" />,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  destructive: <AlertCircle className="h-4 w-4 text-rose-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  info: <Info className="h-4 w-4 text-sky-500" />
}

const variantBorders = {
  default: "border-[#753399]/30 bg-card text-foreground",
  success: "border-emerald-500/30 bg-card text-foreground",
  destructive: "border-rose-500/30 bg-card text-foreground",
  warning: "border-amber-500/30 bg-card text-foreground",
  info: "border-sky-500/30 bg-card text-foreground"
}

export function ToastCard({
  item,
  onDismiss
}: {
  item: ToastItem
  onDismiss: () => void
}) {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, item.duration || 4000)
    return () => clearTimeout(timer)
  }, [item.duration, onDismiss])

  const variant = item.variant || "default"

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-xl border p-4 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200",
        variantBorders[variant]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{variantIcons[variant]}</span>
        <div className="space-y-1">
          {item.title && <h5 className="font-heading text-xs font-bold leading-tight">{item.title}</h5>}
          {item.description && (
            <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
          )}
          {item.action && (
            <button
              onClick={item.action.onClick}
              className="mt-1 text-xs font-bold text-[#753399] hover:underline"
            >
              {item.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="rounded p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}`
  },
  {
    name: "progress",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  indeterminate?: boolean
  showValue?: boolean
  label?: string
  indicatorClassName?: string
}

const variantColors = {
  default: "bg-[#753399]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  info: "bg-sky-500"
}

const sizeHeights = {
  xs: "h-1",
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-3.5",
  xl: "h-4"
}

export function Progress({
  className,
  value = 0,
  max = 100,
  variant = "default",
  size = "default",
  indeterminate = false,
  showValue = false,
  label,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full space-y-1.5 select-none", className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && (
            <span className="font-mono text-[11px] text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative w-full overflow-hidden rounded-full bg-muted", sizeHeights[size])}
      >
        {indeterminate ? (
          <div
            className={cn(
              "absolute h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]",
              variantColors[variant],
              indicatorClassName
            )}
          />
        ) : (
          <div
            className={cn("h-full rounded-full transition-all duration-300", variantColors[variant], indicatorClassName)}
            style={{ width: \`\${percentage}%\` }}
          />
        )}
      </div>
    </div>
  )
}`
  },
  {
    name: "skeleton",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
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
}`
  },
  {
    name: "avatar",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
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
}`
  },
  {
    name: "breadcrumb",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex flex-wrap items-center gap-1.5 break-words text-xs text-muted-foreground sm:gap-2.5", className)} {...props} />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ className, ...props }, ref) => {
    return <a ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("font-bold text-foreground", className)} {...props} />
  )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator }`
  },

  // 4. DADOS & VISUALIZAÇÃO
  {
    name: "table",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-border bg-card">
      <table ref={ref} className={cn("w-full caption-bottom text-sm text-left", className)} {...props} />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b bg-muted/50 font-semibold text-muted-foreground", className)} {...props} />
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0 divide-y divide-border/50", className)} {...props} />
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted", className)} {...props} />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <th ref={ref} className={cn("h-10 px-3 text-left align-middle font-medium text-xs text-muted-foreground", className)} {...props} />
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn("p-3 align-middle text-xs [&:has([role=checkbox])]:pr-0", className)} {...props} />
)
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }`
  },
  {
    name: "chart",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
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
        <div className="pt-2 flex items-end justify-between gap-3 border-b border-border pb-2 px-1" style={{ height: \`\${height}px\` }}>
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
                    style={{ height: \`\${heightPct}%\`, backgroundColor: item.color || color }}
                  />
                  {targetPct && (
                    <div
                      className="w-2/5 rounded-t bg-muted-foreground/20"
                      style={{ height: \`\${targetPct}%\` }}
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
        <div className="relative w-full pt-2" style={{ height: \`\${height}px\` }}>
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
                d={\`M 0,\${160 - (data[0]?.value / maxValue) * 140} \${data.map((d, i) => \`L \${(i / (data.length - 1)) * 500},\${160 - (d.value / maxValue) * 140}\`).join(' ')} L 500,160 L 0,160 Z\`}
                fill="url(#chartGradient)"
              />
            )}
            <path
              d={\`M 0,\${160 - (data[0]?.value / maxValue) * 140} \${data.map((d, i) => \`L \${(i / (data.length - 1)) * 500},\${160 - (d.value / maxValue) * 140}\`).join(' ')}\`}
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
                      strokeDasharray={\`\${pct} 88\`}
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
                    style={{ width: \`\${pct}%\`, backgroundColor: item.color || color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "calendar",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalendarProps {
  className?: string
  onSelectDate?: (date: Date) => void
}

export function Calendar({ className, onSelectDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDay, setSelectedDay] = React.useState<number | null>(currentDate.getDate())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const firstDayIndex = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-border bg-card p-4 shadow-sm space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-heading text-xs font-bold text-foreground">
          {monthNames[month]} {year}
        </h4>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground">
        <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={\`empty-\${i}\`} className="h-7 w-7" />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1
          const isSelected = selectedDay === day
          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day)
                onSelectDate?.(new Date(year, month, day))
              }}
              className={cn(
                "h-7 w-7 rounded-md font-medium transition-colors flex items-center justify-center mx-auto",
                isSelected ? "bg-[#753399] text-white font-bold shadow-sm" : "hover:bg-muted text-foreground"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}`
  },
  {
    name: "tree-view",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

export function TreeView({ data, className }: { data: TreeNode[]; className?: string }) {
  return (
    <div className={cn("space-y-1 text-xs select-none", className)}>
      {data.map(node => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  )
}

function TreeItem({ node }: { node: TreeNode }) {
  const [open, setOpen] = React.useState(false)
  const isBranch = Boolean(node.children && node.children.length > 0)

  return (
    <div>
      <div
        onClick={() => isBranch && setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-muted",
          !isBranch && "pl-6 text-muted-foreground hover:text-foreground"
        )}
      >
        {isBranch && (
          <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-90")} />
        )}
        {isBranch ? (
          open ? <FolderOpen className="h-4 w-4 text-[#753399]" /> : <Folder className="h-4 w-4 text-[#753399]" />
        ) : (
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        <span className="font-medium text-foreground">{node.label}</span>
      </div>
      {isBranch && open && (
        <div className="pl-4 ml-2 border-l border-border space-y-1 mt-1">
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "stepper",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepItem {
  title: string
  description?: string
}

export interface StepperProps {
  steps: StepItem[]
  currentStep: number
  onStepClick?: (step: number) => void
  className?: string
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full grid grid-cols-4 relative px-2", className)}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1
        const isCompleted = stepNum < currentStep
        const isCurrent = stepNum === currentStep
        const isLast = idx === steps.length - 1

        return (
          <div key={idx} className="relative flex flex-col items-center text-center group cursor-pointer" onClick={() => onStepClick?.(stepNum)}>
            {!isLast && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 w-full h-0.5 -z-0",
                  stepNum < currentStep ? "bg-emerald-600" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow transition-all",
                isCompleted && "bg-emerald-600 text-white ring-4 ring-card",
                isCurrent && "bg-[#753399] text-white ring-4 ring-[#753399]/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground border border-border ring-4 ring-card"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : stepNum}
            </div>
            <span className={cn("mt-2 text-xs font-bold", isCurrent ? "text-[#753399]" : isCompleted ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}`
  },
  {
    name: "timeline",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Check, Package, AlertTriangle, XCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export type TimelineStatus = "completed" | "in-progress" | "warning" | "error" | "pending"

export interface TimelineItem {
  id?: string
  title: string
  description?: string
  time?: string
  status?: TimelineStatus
  icon?: React.ReactNode
  badge?: string
  children?: React.ReactNode
}

export function Timeline({ items, className, ...props }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={cn("relative space-y-6 ml-2", className)} {...props}>
      {items.map((item, idx) => {
        const status = item.status || "completed"
        const isLast = idx === items.length - 1

        return (
          <div key={item.id || idx} className="flex gap-4 items-start relative">
            {!isLast && <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-border -z-0" />}
            <div
              className={cn(
                "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm ring-4 ring-card",
                status === "completed" && "bg-emerald-600",
                status === "in-progress" && "bg-[#753399] ring-[#753399]/20 animate-pulse",
                status === "warning" && "bg-amber-500",
                status === "error" && "bg-rose-500",
                status === "pending" && "bg-muted text-muted-foreground border border-border"
              )}
            >
              {item.icon || (status === "completed" ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />)}
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={cn("font-heading text-xs font-bold", status === "in-progress" ? "text-[#753399]" : "text-foreground")}>
                  {item.title}
                </span>
                {item.time && <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>}
              </div>
              {item.description && <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>}
              {item.badge && <span className="inline-block rounded bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-[10px] font-bold">{item.badge}</span>}
              {item.children}
            </div>
          </div>
        )
      })}
    </div>
  )
}`
  },
  {
    name: "statistic",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
}

export function Statistic({ title, value, trend, trendLabel, icon, className, ...props }: StatisticProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        {icon && <div className="p-1 rounded-md bg-muted text-foreground">{icon}</div>}
      </div>
      <h3 className="font-heading text-2xl font-extrabold text-foreground">{value}</h3>
      {trend !== undefined && (
        <p className={cn("text-[11px] font-bold", isPositive ? "text-emerald-500" : "text-rose-500")}>
          {isPositive ? "+" : ""}{trend}% {trendLabel && <span className="font-normal text-muted-foreground">{trendLabel}</span>}
        </p>
      )}
    </div>
  )
}`
  },
  {
    name: "page-header",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  badge?: React.ReactNode
}

export function PageHeader({ title, description, actions, breadcrumbs, badge, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("w-full space-y-4 border-b border-border pb-5", className)} {...props}>
      {breadcrumbs && <div>{breadcrumbs}</div>}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{title}</h1>
            {badge}
          </div>
          {description && <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}`
  },
  {
    name: "radio-group",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextType {
  value?: string
  onChange?: (value: string) => void
  name?: string
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
}

export function RadioGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  disabled,
  children,
  ...props
}: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const onChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val)
      onValueChange?.(val)
    },
    [isControlled, onValueChange]
  )

  return (
    <RadioGroupContext.Provider value={{ value, onChange, name, disabled }}>
      <div role="radiogroup" className={cn("grid gap-2.5", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  id?: string
  disabled?: boolean
}

export function RadioGroupItem({
  className,
  value,
  id,
  disabled: itemDisabled,
  children,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext)
  const isSelected = context?.value === value
  const isDisabled = itemDisabled || context?.disabled

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      id={id}
      onClick={() => {
        if (!isDisabled) context?.onChange?.(value)
      }}
      className={cn(
        "flex items-center gap-3 cursor-pointer select-none text-xs font-medium transition-all",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-input flex items-center justify-center transition-all",
          isSelected
            ? "border-[#753399] bg-[#753399] text-white shadow-sm shadow-[#753399]/30"
            : "bg-background hover:border-[#753399]/70"
        )}
      >
        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white animate-in zoom-in-50 duration-150" />}
      </div>
      {children && <div className="flex-1">{children}</div>}
    </div>
  )
}

export interface RadioGroupCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  title: string
  description?: string
  icon?: React.ReactNode
  badge?: string
  disabled?: boolean
}

export function RadioGroupCard({
  className,
  value,
  title,
  description,
  icon,
  badge,
  disabled,
  ...props
}: RadioGroupCardProps) {
  const context = React.useContext(RadioGroupContext)
  const isSelected = context?.value === value
  const isDisabled = disabled || context?.disabled

  return (
    <div
      onClick={() => {
        if (!isDisabled) context?.onChange?.(value)
      }}
      className={cn(
        "relative flex cursor-pointer items-start gap-4 rounded-xl border p-4 shadow-sm transition-all",
        isSelected
          ? "border-[#753399] bg-[#753399]/5 ring-1 ring-[#753399] dark:bg-[#753399]/10"
          : "border-border bg-card hover:border-[#753399]/40 hover:bg-muted/30",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center transition-all",
          isSelected
            ? "border-[#753399] bg-[#753399]"
            : "border-input bg-background"
        )}
      >
        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[#753399]">{icon}</span>}
            <span className="font-heading text-xs font-bold text-foreground">{title}</span>
          </div>
          {badge && (
            <span className="rounded-full bg-[#753399]/15 px-2 py-0.5 text-[10px] font-bold text-[#753399] dark:text-purple-300">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>}
      </div>
    </div>
  )
}`
  },
  {
    name: "slider",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  valuePrefix?: string
  valueSuffix?: string
  onValueChange?: (value: number) => void
}

export function Slider({
  className,
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  valuePrefix = "",
  valueSuffix = "",
  onValueChange,
  disabled,
  ...props
}: SliderProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (!isControlled) setUncontrolledValue(val)
    onValueChange?.(val)
  }

  return (
    <div className={cn("w-full space-y-2 select-none", className)}>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed z-10"
          {...props}
        />
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-[#753399] transition-all"
            style={{ width: percentage + "%" }}
          />
        </div>
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#753399] bg-background shadow-md transition-all ring-offset-background"
          style={{ left: percentage + "%" }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>{valuePrefix}{min}{valueSuffix}</span>
        {showValue && (
          <span className="font-bold text-[#753399] bg-[#753399]/10 px-2 py-0.5 rounded">
            {valuePrefix}{value}{valueSuffix}
          </span>
        )}
        <span>{valuePrefix}{max}{valueSuffix}</span>
      </div>
    </div>
  )
}`
  },
  {
    name: "date-picker",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DatePickerProps {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  className?: string
}

export function DatePicker({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  placeholder = "Selecione uma data...",
  disabled,
  label,
  className
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedDate = isControlled ? controlledValue : uncontrolledValue

  const [currentMonth, setCurrentMonth] = React.useState<Date>(selectedDate || new Date())
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (date: Date) => {
    if (!isControlled) setUncontrolledValue(date)
    onValueChange?.(date)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setUncontrolledValue(null)
    onValueChange?.(null)
  }

  const formatDate = (d: Date | null) => {
    if (!d) return ""
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return day + "/" + month + "/" + year
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className={cn("flex items-center gap-2", !selectedDate && "text-muted-foreground")}>
          <CalendarIcon className="h-4 w-4 text-[#753399]" />
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        {selectedDate && (
          <span onClick={handleClear} className="rounded p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-64 rounded-xl border border-border bg-card p-3 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-heading text-xs font-bold text-foreground">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={"empty-" + i} />
            ))}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1
              const date = new Date(year, month, day)
              const isSelected =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(date)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors",
                    isSelected
                      ? "bg-[#753399] font-bold text-white shadow-sm"
                      : "hover:bg-muted text-foreground",
                    isToday && !isSelected && "border border-[#753399] text-[#753399] font-bold"
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "lookup",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Search, X, Check, Table as TableIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LookupItem {
  id: string | number
  code: string
  label: string
  subtitle?: string
  tag?: string
}

export interface LookupProps {
  label?: string
  placeholder?: string
  title?: string
  value?: LookupItem | null
  items: LookupItem[]
  onSelect?: (item: LookupItem | null) => void
  disabled?: boolean
  className?: string
}

export function Lookup({
  label,
  placeholder = "Clique para buscar registro...",
  title = "Buscar Registro Corporativo",
  value,
  items = [],
  onSelect,
  disabled,
  className
}: LookupProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filtered = items.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase()))
  )

  const handleChoose = (item: LookupItem) => {
    onSelect?.(item)
    setOpen(false)
    setSearch("")
  }

  return (
    <div className={cn("w-full space-y-1.5 text-left", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <div className="relative flex items-center">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(true)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {value ? (
            <span className="flex items-center gap-2 font-medium text-foreground">
              <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{value.code}</span>
              <span>{value.label}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <span className="flex items-center gap-1.5 text-[#753399]">
            <Search className="h-3.5 w-3.5" />
          </span>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onSelect?.(null)}
            className="absolute right-8 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0 duration-150">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <TableIcon className="h-4 w-4 text-[#753399]" />
                <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm opacity-70 hover:opacity-100 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Pesquise por código, razão social ou filial..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]"
                />
              </div>

              <div className="max-h-60 overflow-y-auto rounded-lg border border-border divide-y divide-border/60">
                {filtered.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    Nenhum registro correspondente encontrado.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleChoose(item)}
                      className={cn(
                        "flex items-center justify-between p-3 text-xs cursor-pointer hover:bg-muted/50 transition-colors",
                        value?.id === item.id && "bg-[#753399]/10 font-semibold"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#753399] font-bold">{item.code}</span>
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        {item.subtitle && <p className="text-[11px] text-muted-foreground">{item.subtitle}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {item.tag}
                          </span>
                        )}
                        {value?.id === item.id && <Check className="h-4 w-4 text-[#753399]" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "combo",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ComboboxOption {
  value: string
  label: string
  hint?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options = [],
  value,
  onValueChange,
  placeholder = "Selecione uma opção...",
  searchPlaceholder = "Buscar na lista...",
  label,
  disabled,
  className
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)
  const filtered = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      (opt.hint && opt.hint.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">Nenhuma opção encontrada.</div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onValueChange?.(opt.value)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors",
                    value === opt.value
                      ? "bg-[#753399] text-white font-semibold"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div>
                    <span>{opt.label}</span>
                    {opt.hint && (
                      <span className={cn("ml-2 text-[10px]", value === opt.value ? "text-purple-200" : "text-muted-foreground")}>
                        {opt.hint}
                      </span>
                    )}
                  </div>
                  {value === opt.value && <Check className="h-3.5 w-3.5 shrink-0" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "multiselect",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Check, ChevronsUpDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  selected?: string[]
  onSelectedChange?: (values: string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options = [],
  selected = [],
  onSelectedChange,
  placeholder = "Selecione múltiplos itens...",
  label,
  disabled,
  className
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOption = (val: string) => {
    if (selected.includes(val)) {
      onSelectedChange?.(selected.filter((item) => item !== val))
    } else {
      onSelectedChange?.([...selected, val])
    }
  }

  const removeOption = (e: React.MouseEvent, val: string) => {
    e.stopPropagation()
    onSelectedChange?.(selected.filter((item) => item !== val))
  }

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex min-h-[38px] w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-1.5 text-xs shadow-sm transition-colors hover:border-[#753399] cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {selected.length === 0 ? (
          <span className="px-1.5 text-muted-foreground">{placeholder}</span>
        ) : (
          selected.map((val) => {
            const opt = options.find((o) => o.value === val)
            return (
              <span
                key={val}
                className="inline-flex items-center gap-1 rounded-md bg-[#753399]/15 px-2 py-0.5 text-xs font-semibold text-[#753399] dark:text-purple-300"
              >
                <span>{opt ? opt.label : val}</span>
                <span
                  onClick={(e) => removeOption(e, val)}
                  className="rounded hover:bg-[#753399]/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            )
          })
        )}
        <ChevronsUpDown className="ml-auto h-3.5 w-3.5 opacity-50 pr-1" />
      </div>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Filtrar opções..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">Nenhuma opção encontrada.</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors",
                      isSelected
                        ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#753399]" />}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "navbar",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { Search, Bell, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode
  links?: Array<{ label: string; href?: string; active?: boolean; onClick?: () => void }>
  actions?: React.ReactNode
  user?: {
    name: string
    role?: string
    avatar?: string
    fallback?: string
    onProfileClick?: () => void
  }
  searchPlaceholder?: string
  onSearchClick?: () => void
}

export function Navbar({
  brand,
  links = [],
  actions,
  user,
  searchPlaceholder = "Buscar no sistema...",
  onSearchClick,
  className,
  children,
  ...props
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          {brand || (
            <div className="flex items-center gap-2 font-heading text-sm font-bold text-foreground cursor-pointer">
              <div className="h-7 w-7 rounded-lg bg-[#753399] text-white flex items-center justify-center font-black text-xs shadow-sm">
                M
              </div>
              <span>Monta<span className="text-[#753399]">UI</span></span>
            </div>
          )}

          {/* Desktop Nav Links */}
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className={cn(
                    "rounded-md px-3 py-1.5 transition-colors",
                    link.active
                      ? "bg-[#753399]/10 text-[#753399] font-bold dark:text-purple-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Right Actions & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground hover:border-input hover:text-foreground transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{searchPlaceholder}</span>
              <kbd className="rounded border border-border bg-background px-1 py-0.2 text-[9px] font-mono">⌘K</kbd>
            </button>
          )}

          {actions}

          {user && (
            <div
              onClick={user.onProfileClick}
              className="flex items-center gap-2 pl-2 border-l border-border cursor-pointer group"
            >
              <div className="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                {user.fallback || user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-foreground leading-none">{user.name}</p>
                {user.role && <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{user.role}</p>}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {links.length > 0 && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && links.length > 0 && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                link.onClick?.()
                setMobileOpen(false)
              }}
              className={cn(
                "w-full text-left rounded-md px-3 py-2 text-xs font-medium transition-colors",
                link.active
                  ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}`
  },
  {
    name: "sidebar",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { PanelLeftClose, PanelLeft, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar deve ser utilizado dentro de um <SidebarProvider>")
  }
  return context
}

export function SidebarProvider({
  defaultCollapsed = false,
  children
}: {
  defaultCollapsed?: boolean
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const toggle = React.useCallback(() => setCollapsed(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "flex flex-col justify-between border-r border-border bg-card transition-all duration-300 select-none h-screen",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-3.5 border-b border-border flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-2 space-y-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { collapsed } = useSidebar()
  if (collapsed) return null

  return (
    <p className={cn("px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80", className)} {...props}>
      {children}
    </p>
  )
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  active?: boolean
  badge?: React.ReactNode
}

export function SidebarItem({
  icon,
  active = false,
  badge,
  children,
  className,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebar()

  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
        active
          ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium",
        collapsed && "justify-center px-0",
        className
      )}
      title={collapsed && typeof children === "string" ? children : undefined}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!collapsed && (
        <>
          <span className="truncate flex-1 text-left">{children}</span>
          {badge && <span className="shrink-0">{badge}</span>}
        </>
      )}
    </button>
  )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-2.5 border-t border-border", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, toggle } = useSidebar()

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors", className)}
      {...props}
    >
      {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
    </button>
  )
}`
  },
  {
    name: "field",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean
  disabled?: boolean
}

export function Field({ className, error, disabled, children, ...props }: FieldProps) {
  return (
    <div
      className={cn("space-y-1.5 w-full", disabled && "opacity-60 pointer-events-none", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function FieldLabel({ className, required, children, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn(
        "text-xs font-semibold text-foreground flex items-center gap-1 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 font-bold">*</span>}
    </label>
  )
}

export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[11px] text-muted-foreground leading-relaxed", className)} {...props} />
  )
}

export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null
  return (
    <p
      role="alert"
      className={cn("text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 animate-in fade-in-0 duration-150", className)}
      {...props}
    >
      {children}
    </p>
  )
}`
  },
  {
    name: "form",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
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
}`
  },
  {
    name: "marker",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
import { cn } from "@/lib/utils"

export type MarkerVariant = "brand" | "success" | "warning" | "destructive" | "info"

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MarkerVariant
  label?: React.ReactNode
  tooltip?: React.ReactNode
  pulse?: boolean
  size?: "sm" | "default" | "lg"
}

const markerColors: Record<MarkerVariant, { bg: string; pulse: string }> = {
  brand: { bg: "bg-[#753399]", pulse: "bg-[#753399]/30" },
  success: { bg: "bg-emerald-600", pulse: "bg-emerald-500/30" },
  warning: { bg: "bg-amber-500", pulse: "bg-amber-500/30" },
  destructive: { bg: "bg-rose-600", pulse: "bg-rose-500/30" },
  info: { bg: "bg-sky-600", pulse: "bg-sky-500/30" }
}

const markerSizes = {
  sm: "h-5 w-5 text-[10px]",
  default: "h-7 w-7 text-xs",
  lg: "h-9 w-9 text-sm"
}

export function Marker({
  variant = "brand",
  label,
  tooltip,
  pulse = true,
  size = "default",
  className,
  ...props
}: MarkerProps) {
  const [open, setOpen] = React.useState(false)
  const color = markerColors[variant]

  return (
    <div
      className={cn("relative inline-flex flex-col items-center group cursor-pointer select-none", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {pulse && <span className={cn("absolute h-full w-full rounded-full animate-ping scale-150", color.pulse)} />}
        <div
          className={cn(
            "relative rounded-full text-white flex items-center justify-center font-bold shadow-lg border-2 border-background transition-transform group-hover:scale-110",
            color.bg,
            markerSizes[size]
          )}
        >
          {label}
        </div>
      </div>

      {tooltip && (open || undefined) && (
        <div className="absolute top-full mt-1 z-30 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="rounded-lg border border-border bg-card p-2 shadow-xl text-center whitespace-nowrap text-xs">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}`
  },
  {
    name: "pagination",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    content: `import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  size?: "default" | "sm"
}

export function PaginationLink({
  className,
  isActive,
  size = "default",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#753399]",
        size === "default" ? "h-8 min-w-8 px-3" : "h-7 min-w-7 px-2 text-[11px]",
        isActive
          ? "bg-[#753399] font-bold text-white shadow-sm"
          : "border border-border bg-card text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export function PaginationPrevious({
  className,
  children = "Anterior",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-3.5 w-3.5" />
      <span>{children}</span>
    </button>
  )
}

export function PaginationNext({
  className,
  children = "Próximo",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight className="h-3.5 w-3.5" />
    </button>
  )
}

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      className={cn("flex h-8 w-8 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  )
}`
  },
  {
    name: "loading",
    dependencies: ["clsx", "tailwind-merge"],
    content: `import * as React from "react"
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
}`
  }
];

// Gerar os arquivos TypeScript e JSON
console.log(`[Monta UI] Compilando ${components.length} componentes 100% nativos (Zero Radix)...`);

components.forEach(comp => {
  // Gravar arquivo .tsx
  const tsxPath = path.join(UI_DIR, `${comp.name}.tsx`);
  fs.writeFileSync(tsxPath, comp.content, 'utf-8');

  // Gravar arquivo .json do registro
  const jsonPath = path.join(JSON_DIR, `${comp.name}.json`);
  const jsonContent = {
    name: comp.name,
    type: "registry:ui",
    dependencies: comp.dependencies,
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: `ui/${comp.name}.tsx`,
        content: comp.content,
        type: "registry:ui",
        target: `components/monta-ui/${comp.name}.tsx`
      }
    ]
  };
  fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf-8');
});

// Gerar index.json oficial do registro
const registryIndex = {
  name: "monta-ui",
  homepage: "https://montaui.com.br",
  items: components.map(c => ({
    name: c.name,
    type: "registry:ui",
    dependencies: c.dependencies,
    files: [`ui/${c.name}.tsx`]
  }))
};
fs.writeFileSync(path.join(REGISTRY_DIR, 'index.json'), JSON.stringify(registryIndex, null, 2), 'utf-8');

console.log(`[Monta UI] Registro completo gerado com sucesso! ${components.length} componentes gravados em ${REGISTRY_DIR}`);
