"use client"

import * as React from "react"
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
}