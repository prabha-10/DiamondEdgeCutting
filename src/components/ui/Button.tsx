import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "outline" | "ghost" | "default" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  /** Only used when variant="brand" — hides the arrow icon (e.g. mobile full-width buttons) */
  noIcon?: boolean
}

// ─── Brand CTA (the pill + arrow-circle style) ────────────────────────────────

function BrandButton({
  className,
  size,
  children,
  noIcon,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const isLg = size === "lg"

  return (
    <button
      ref={ref}
      className={cn(
        "group inline-flex items-center rounded-full border-2 border-brand-gray-900 bg-brand-gray-900 text-white font-bold transition-all duration-300",
        "hover:bg-brand-gray-700 hover:border-brand-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gray-900 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
        isLg ? "h-14 text-base" : "h-14 text-base",
        noIcon ? "justify-center px-8" : "pl-2 pr-7 gap-3",
        className
      )}
      {...props}
    >
      {/* White circle with arrow icon */}
      {!noIcon && (
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-white text-brand-gray-900 shrink-0 transition-transform duration-300 group-hover:rotate-45",
            "w-9 h-9"
          )}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
        </span>
      )}
      {children}
    </button>
  )
}

// ─── Generic Button ───────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, noIcon, ...props }, ref) => {
    if (variant === "brand") {
      return <BrandButton className={className} size={size} noIcon={noIcon} ref={ref} {...props} />
    }

    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants: Record<string, string> = {
      default: "bg-brand-gray-900 text-white hover:bg-brand-gray-700",
      outline:
        "border-2 border-current bg-transparent hover:bg-brand-gray-900 hover:text-white text-brand-gray-900",
      ghost: "hover:bg-brand-gray-100 text-brand-gray-900",
      link: "text-brand-gray-900 underline-offset-4 hover:underline",
    }

    const sizes: Record<string, string> = {
      default: "h-12 px-6 py-2 text-sm",
      sm: "h-10 px-4 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-12 w-12",
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant] ?? variants.default, sizes[size] ?? sizes.default, className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
