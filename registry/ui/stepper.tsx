"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepItem {
  title: string
  description?: string
}

export interface StepperProps {
  steps: StepItem[]
  currentStep: number
  onStepClick?: (step: number) => void
  className?: string
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full grid relative px-2", className)} style={{ gridTemplateColumns: "repeat(" + Math.max(1, steps.length) + ", minmax(0, 1fr))" }}>
      {steps.map((step, idx) => {
        const stepNum = idx + 1
        const isCompleted = stepNum < currentStep
        const isCurrent = stepNum === currentStep
        const isLast = idx === steps.length - 1

        return (
          <div key={idx} className="relative flex flex-col items-center text-center group cursor-pointer" onClick={() => onStepClick?.(stepNum)}>
            {!isLast && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 w-full h-0.5 -z-0",
                  stepNum < currentStep ? "bg-emerald-600" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow transition-all",
                isCompleted && "bg-emerald-600 text-white ring-4 ring-card",
                isCurrent && "bg-[#753399] text-white ring-4 ring-[#753399]/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground border border-border ring-4 ring-card"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : stepNum}
            </div>
            <span className={cn("mt-2 text-xs font-bold", isCurrent ? "text-[#753399]" : isCompleted ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}