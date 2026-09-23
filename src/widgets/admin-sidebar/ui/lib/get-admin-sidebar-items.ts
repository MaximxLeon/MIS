import {
  getUserPermissions,
  requireSession,
} from '@/server/auth';
import {
  PERMISSIONS,
  type TPermission,
} from '@/shared/config/permissions';
import type { SidebarItemProps } from '@/shared/ui/sidebar';

type AdminSidebarItem = SidebarItemProps & {
  permission: TPermission;
};

const ADMIN_SIDEBAR_ITEMS: AdminSidebarItem[] = [
  {
    title: "Главная",
    href: "/admin",
    icon: "home",
    permission: PERMISSIONS.ADMIN_STATISTICS_READ,
  },
  {
    title: "Организации",
    href: "/admin/organizations",
    icon: "building",
    permission: PERMISSIONS.ORGANIZATION_READ,
  },
  {
    title: "Пользователи",
    href: "/admin/users",
    icon: "users",
    permission: PERMISSIONS.USER_READ,
  },
  {
    title: "Роли",
    href: "/admin/roles",
    icon: "shield",
    permission: PERMISSIONS.ROLE_READ,
  },
  {
    title: "Права",
    href: "/admin/permissions",
    icon: "shieldCog",
    permission: PERMISSIONS.ADMIN_PERMISSIONS_READ,
  },
  {
    title: "Аудит",
    href: "/admin/audits",
    icon: "logs",
    permission: PERMISSIONS.ADMIN_AUDIT_READ,
  },
];

// Получить доступные пункты админки
export async function getAdminSidebarItems(): Promise<SidebarItemProps[]> {
  const session = await requireSession();
  const permissions = await getUserPermissions(session.userId);

  return ADMIN_SIDEBAR_ITEMS.filter(({ permission }) =>
    permissions.has(permission),
  ).map(({ title, href, icon }) => ({
    title,
    href,
    icon,
  }));
}
