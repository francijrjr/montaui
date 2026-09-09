"use client"

import * as React from "react"
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

export function Sidebar({ className, children, collapsible = true, ...props }: SidebarProps) {
  const context = useSidebar()
  const collapsed = collapsible && context.collapsed

  return (
    <SidebarContext.Provider value={{ ...context, collapsed }}>
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
    </SidebarContext.Provider>
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
}