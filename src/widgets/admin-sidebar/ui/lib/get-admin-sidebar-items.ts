import { requireSession } from '@/server/auth';
import {
  PERMISSIONS,
  type TPermission,
} from '@/shared/config/permissions';
import {
  createPermissionChecker,
} from '@/shared/lib/create-permission-checker';
import type { SidebarItemProps } from '@/shared/ui/sidebar';

type AdminSidebarItem = SidebarItemProps & {
  permissions: TPermission[];
};

const ADMIN_SIDEBAR_ITEMS: AdminSidebarItem[] = [
  {
    title: "Главная",
    href: "/admin",
    icon: "home",
    permissions: [PERMISSIONS.ADMIN_STATISTICS_READ],
  },
  {
    title: "Организации",
    href: "/admin/organizations",
    icon: "building",
    permissions: [
      PERMISSIONS.ORGANIZATION_READ,
      PERMISSIONS.ORGANIZATION_READ_OWN,
    ],
  },
  {
    title: "Пользователи",
    href: "/admin/users",
    icon: "users",
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    title: "Роли",
    href: "/admin/roles",
    icon: "shield",
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    title: "Права",
    href: "/admin/permissions",
    icon: "shieldCog",
    permissions: [PERMISSIONS.ADMIN_PERMISSIONS_READ],
  },
  {
    title: "Аудит",
    href: "/admin/audits",
    icon: "logs",
    permissions: [PERMISSIONS.ADMIN_AUDIT_READ],
  },
];

export async function getAdminSidebarItems(): Promise<SidebarItemProps[]> {
  const session = await requireSession();

  const permissions = session.user.permissions
    .filter((item) => item.allowed)
    .map((item) => item.permission.name as TPermission);

  const { can } = createPermissionChecker(permissions);

  return ADMIN_SIDEBAR_ITEMS.filter(({ permissions }) =>
    permissions.some((permission) => can(permission)),
  ).map(({ title, href, icon }) => ({
    title,
    href,
    icon,
  }));
}
