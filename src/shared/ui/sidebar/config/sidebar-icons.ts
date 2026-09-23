import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Home,
  Logs,
  ShieldCheck,
  ShieldCog,
  Users,
} from 'lucide-react';

export const SIDEBAR_ICONS = {
  home: Home,
  building: Building2,
  users: Users,
  shield: ShieldCheck,
  logs: Logs,
  shieldCog: ShieldCog,
} satisfies Record<string, LucideIcon>;

export type SidebarIcon = keyof typeof SIDEBAR_ICONS;