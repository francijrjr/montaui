"use client"

import * as React from "react"
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
}