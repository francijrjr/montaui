import * as React from "react"
import { Eye, EyeOff, X, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon: Icon, clearable = false, onClear, disabled, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative flex w-full items-center">
        {Icon && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground">
            <Icon className="size-4" />
          </div>
        )}
        <input
          type={inputType}
          className={cn(
            "flex min-h-[42px] w-full rounded-md border border-input bg-background px-3.5 py-2 text-[13px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-9",
            (clearable || isPassword) && "pr-9",
            className
          )}
          ref={ref}
          disabled={disabled}
          value={value}
          {...props}
        />
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        {clearable && !isPassword && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }