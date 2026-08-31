import * as React from "react"
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
}