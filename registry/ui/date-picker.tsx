import * as React from "react"
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
}