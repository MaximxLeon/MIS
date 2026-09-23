"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib';

import {
  SIDEBAR_ICONS,
  type SidebarIcon,
} from './config/sidebar-icons';

export type SidebarItemProps = {
  title: string;
  href: string;
  icon?: SidebarIcon;
  collapsed: boolean;
};

export function SidebarItem({
  title,
  href,
  icon,
  collapsed,
}: SidebarItemProps) {
  const pathname = usePathname();

  const Icon = icon ? SIDEBAR_ICONS[icon] : undefined;

  const active = pathname === href || pathname.endsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-md text-text-muted font-semibold",
        "transition-colors",
        "hover:bg-primary hover:text-primary-light",
        active && "bg-primary-light text-primary border-r-4",
        active && collapsed && "border-none",
        collapsed && "px-2",
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {!collapsed && <span>{title}</span>}
    </Link>
  );
}
