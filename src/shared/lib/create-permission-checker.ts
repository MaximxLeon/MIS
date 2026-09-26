import type { TPermission } from '@/shared/config/permissions';

export function createPermissionChecker(permissions: TPermission[]) {
  const permissionSet = new Set(permissions);

  return {
    can(permission: TPermission) {
      return permissionSet.has(permission);
    },
  };
}
