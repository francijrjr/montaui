"use client"

import * as React from "react"
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
}