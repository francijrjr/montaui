"use client"

import * as React from "react"
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
          <div key={`empty-${i}`} className="h-7 w-7" />
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
}