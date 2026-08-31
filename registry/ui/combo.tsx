import * as React from "react"
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
}