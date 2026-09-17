import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  base: [
    "w-full border text-foreground",
    "outline-none transition-colors",
    "placeholder:text-text-muted",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],

  variants: {
    variant: {
      default: [
        "border-border bg-card",
        "focus:border-primary focus:ring-2 focus:ring-focus-ring/30",
      ],

      filled: [
        "border-transparent bg-secondary",
        "focus:border-primary focus:ring-2 focus:ring-focus-ring/30",
      ],

      outline: [
        "border-2 border-border bg-transparent",
        "focus:border-primary focus:ring-2 focus:ring-focus-ring/30",
      ],

      ghost: [
        "border-transparent bg-transparent",
        "focus:border-primary focus:ring-2 focus:ring-focus-ring/30",
      ],

      danger: [
        "border-danger bg-card",
        "focus:border-danger focus:ring-2 focus:ring-danger/30",
      ],
    },

    size: {
      sm: "h-9 rounded-md px-2.5 text-xs",
      md: "h-11 rounded-lg px-3 text-sm",
      lg: "h-13 rounded-xl px-4 text-base",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type TInputVariant = "default" | "filled" | "outline" | "ghost" | "danger";

type TInputSize = "sm" | "md" | "lg";

type TInputProps = Omit<ComponentProps<"input">, "size"> & {
  variant?: TInputVariant;
  size?: TInputSize;
  error?: string;
  label?: string;
};

export function Input({
  variant = "default",
  size = "md",
  label,
  error,
  className,
  ...props
}: TInputProps) {
  const hasError = Boolean(error);

  return (
    <div className="flex w-full flex-col gap-1">
      {label && <label className="text-heading font-semibold">{label}</label>} 
      <input
        className={input({
          variant: hasError ? "danger" : variant,
          size,
          className,
        })}
        aria-invalid={hasError}
        {...props}
      />

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
