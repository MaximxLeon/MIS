import type { TPermission } from '@/shared/config/permissions';

type UserPermissions = Array<{
  allowed: boolean;
  permission: {
    name: string;
  };
}>;

export function mapUserPermissionsToNames(
  permissions: UserPermissions,
): TPermission[] {
  return permissions
    .filter((item) => item.allowed)
    .map((item) => item.permission.name as TPermission);
}
