"use client";

import { useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  User2Icon,
} from 'lucide-react';

import { useMeQuery } from '@/entities/user';
import { cn } from '@/shared/lib';

import {
  SidebarItem,
  type SidebarItemProps,
} from './sidebar-item';

type SidebarProps = {
  title?: string;
  items: SidebarItemProps[];
};

export function Sidebar({ title, items }: SidebarProps) {
  const meQuery = useMeQuery();
  const [active, setActive] = useState(true);

  return (
    <aside
      className={cn(
        "hidden min-h-screen flex-col justify-between overflow-hidden lg:flex",
        "border-r border-border-strong bg-sidebar p-4",
        "transition-[width] duration-300 ease-in-out",
        active ? "w-64" : "w-16",
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          {active && title && (
            <h1 className="text-text-muted text-sm font-bold uppercase">
              {title}
            </h1>
          )}

          <button
            type="button"
            onClick={() => setActive((prev) => !prev)}
            className="rounded-md p-2 hover:bg-muted-bg"
            aria-label={active ? "Свернуть меню" : "Развернуть меню"}
          >
            {active ? (
              <ChevronLeft className="size-5" />
            ) : (
              <ChevronRight className="size-5" />
            )}
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1">
          {items.map((item) => (
            <SidebarItem key={item.href} {...item} collapsed={!active} />
          ))}
        </nav>
      </div>

      {active && (
        <div className="flex flex-row items-center gap-3 rounded-xl bg-muted-bg p-4">
          <User2Icon className="size-5 shrink-0" />

          <div className="flex min-w-0 flex-col">
            <span className="truncate font-bold">
              {meQuery.data?.user.name}
            </span>

            <span className="truncate text-sm text-muted">
              {meQuery.data?.user.email}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
