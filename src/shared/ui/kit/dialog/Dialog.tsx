"use client";

import type {
  MouseEvent,
  ReactNode,
} from 'react';
import { useEffect } from 'react';

import { X } from 'lucide-react';

import { cn } from '@/shared/lib';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-overlay p-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        className={cn(
          "relative flex w-full max-w-lg flex-col",
          "max-h-[calc(100dvh-2rem)]",
          "rounded-xl bg-card shadow-xl",
          className,
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          {title && <h2 className="text-xl font-bold">{title}</h2>}

          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-md p-2 hover:bg-muted-bg"
            aria-label="Закрыть"
          >
            <X className="size-6 text-chart-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
