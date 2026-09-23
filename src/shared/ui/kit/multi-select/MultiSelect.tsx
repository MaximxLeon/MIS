"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Check,
  ChevronDown,
  X,
} from 'lucide-react';

import { cn } from '@/shared/lib';

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  label?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
};

export function MultiSelect({
  label,
  placeholder = "Выберите значения",
  options,
  value,
  onChange,
  error,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(
        value.filter((item) => item !== optionValue),
      );
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(
      value.filter((item) => item !== optionValue),
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col gap-1"
    >
      {label && (
        <label className="text-heading font-semibold">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "min-h-11 w-full rounded-lg border bg-card px-3 py-2",
          "flex items-center gap-2 text-left",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-focus-ring/30",
          error
            ? "border-danger"
            : "border-border focus:border-primary",
          disabled &&
            "cursor-not-allowed opacity-50",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-sm text-text-muted">
              {placeholder}
            </span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm"
              >
                {option.label}

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.stopPropagation();
                      removeOption(option.value);
                    }
                  }}
                  className="cursor-pointer text-text-muted hover:text-foreground"
                >
                  <X className="size-3.5" />
                </span>
              </span>
            ))
          )}
        </div>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {error && (
        <span className="text-xs text-danger">
          {error}
        </span>
      )}

      {open && !disabled && (
        <div className="absolute top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-card p-1 shadow-lg">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-text-muted">
              Нет доступных вариантов
            </div>
          ) : (
            options.map((option) => {
              const selected = value.includes(
                option.value,
              );

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    toggleOption(option.value)
                  }
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                    "text-left hover:bg-muted-bg",
                    selected && "bg-muted-bg",
                  )}
                >
                  <span>{option.label}</span>

                  {selected && (
                    <Check className="size-4 text-primary" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}