"use client"

import * as React from "react"
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
}