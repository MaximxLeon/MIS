import type { ComponentProps, ReactNode } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],

  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",

      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",

      outline:
        "border border-border bg-transparent text-foreground hover:bg-muted-bg",

      ghost: "bg-transparent text-foreground hover:bg-muted-bg",

      danger: "bg-danger text-white hover:bg-danger/90",

      success: "bg-success text-white hover:bg-success/90",

      warning: "bg-warning text-white hover:bg-warning/90",

      link: "text-link underline-offset-4 hover:text-link-hover hover:underline",

      iconOnly: "h-10 w-10 p-0",
    },

    size: {
      short: "h-9 px-3 text-sm",
      long: "h-11 px-5 text-base",
      full: "h-11 w-full px-5 text-base",
    },

    loading: {
      true: "cursor-wait",
      false: "",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "short",
    loading: false,
  },
});

type TButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "link"
  | "iconOnly";

type TButtonSize = "short" | "long" | "full";

type TButtonProps = ComponentProps<"button"> & {
  variant?: TButtonVariant;
  size?: TButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "center";
};

export function Button({
  children,
  variant = "primary",
  size = "short",
  loading = false,
  icon,
  iconPosition = "left",
  className,
  disabled,
  ...props
}: TButtonProps) {
  return (
    <button
      {...props}
      className={button({
        variant,
        size,
        loading,
        className,
      })}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? (
        "Загрузка..."
      ) : (
        <>
          {icon && iconPosition === "left" && icon}

          {iconPosition !== "center" && variant !== "iconOnly" && children}

          {icon && iconPosition === "right" && icon}

          {icon && iconPosition === "center" && icon}
        </>
      )}
    </button>
  );
}
