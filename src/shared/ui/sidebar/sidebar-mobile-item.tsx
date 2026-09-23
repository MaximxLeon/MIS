"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib';

import {
  SIDEBAR_ICONS,
  type SidebarIcon,
} from './config/sidebar-icons';

export type SidebarMobileItemProps = {
  title: string;
  href: string;
  icon?: SidebarIcon;
  onClick?: () => void;
};

export function SidebarMobileItem({
  title,
  href,
  icon,
  onClick,
}: SidebarMobileItemProps) {
  const pathname = usePathname();

  const Icon = icon ? SIDEBAR_ICONS[icon] : undefined;

  const active =
    pathname === href ||
    pathname.endsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2",
        "text-md font-semibold text-text-muted",
        "transition-colors",
        "hover:bg-primary hover:text-primary-light",
        active && "border-r-4 bg-primary-light text-primary",
      )}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span>{title}</span>
    </Link>
  );
}