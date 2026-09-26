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
};

type SidebarItemComponentProps = SidebarItemProps & {
  collapsed: boolean;
};

export function SidebarItem({
  title,
  href,
  icon,
  collapsed,
}: SidebarItemComponentProps) {
  const pathname = usePathname();

  const Icon = icon ? SIDEBAR_ICONS[icon] : undefined;
  const active = pathname === href || pathname.endsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-md font-semibold text-text-muted",
        "transition-colors",
        "hover:bg-primary hover:text-primary-light",
        active && "border-r-4 bg-primary-light text-primary",
        active && collapsed && "border-none",
        collapsed && "px-2",
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {!collapsed && <span>{title}</span>}
    </Link>
  );
}
