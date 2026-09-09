"use client"

import * as React from "react"
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
}