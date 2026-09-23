"use client";

import { useState } from 'react';

import {
  Menu,
  X,
} from 'lucide-react';

import { cn } from '@/shared/lib';

import {
  SidebarMobileItem,
  type SidebarMobileItemProps,
} from './sidebar-mobile-item';

type SidebarMobileProps = {
  title?: string;
  items: SidebarMobileItemProps[];
};

export function SidebarMobile({ title, items }: SidebarMobileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 items-center border-b border-border-strong px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 hover:bg-muted-bg"
          aria-label="Открыть меню"
        >
          <Menu className="size-6" />
        </button>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          "pointer-events-none",
          open && "pointer-events-auto",
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50",
            "opacity-0 transition-opacity duration-200",
            open && "opacity-100",
          )}
          onClick={() => setOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={cn(
            "relative flex h-full flex-col justify-between",
            "overflow-hidden bg-sidebar-foreground",
            "transition-[width] duration-200 ease-in-out",
            open ? "w-64 p-4" : "w-0 p-0",
          )}
        >
          <div>
            <div className="flex items-center justify-between">
              {title && (
                <h1 className="text-text-muted text-sm font-bold uppercase">
                  {title}
                </h1>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 hover:bg-muted-bg"
                aria-label="Закрыть меню"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              {items.map((item) => (
                <SidebarMobileItem
                  key={item.href}
                  {...item}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}
