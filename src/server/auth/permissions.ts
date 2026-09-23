import 'server-only';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { AppError } from '@/server/errors/app-error';
import { prisma } from '@/server/prisma';
import { Prisma } from '@/server/prisma/generated/prisma/client';
import {
  PERMISSIONS,
  TPermission,
} from '@/shared/config/permissions';

const userWithPermissionsInclude = {
  roles: {
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  },
  permissions: {
    include: {
      permission: true,
    },
  },
} satisfies Prisma.UserInclude;

type UserWithPermissions = Prisma.UserGetPayload<{
  include: typeof userWithPermissionsInclude;
}>;

async function getUserWithPermissions(
  userId: string,
): Promise<UserWithPermissions | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: userWithPermissionsInclude,
  });
}

export async function requireSuperAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      isSuperAdmin: true,
    },
  });

  return user?.isSuperAdmin ?? false;
}

export async function hasPermission(
  userId: string,
  permission: TPermission,
): Promise<boolean> {
  const user = await getUserWithPermissions(userId);

  if (!user) {
    return false;
  }

  if (user.isSuperAdmin) {
    return true;
  }

  const directPermission = user.permissions.find(
    (item) => item.permission.name === permission,
  );

  if (directPermission) {
    return directPermission.allowed;
  }

  return user.roles.some((userRole) =>
    userRole.role.permissions.some(
      (item) => item.permission.name === permission,
    ),
  );
}

export async function getUserPermissions(
  userId: string,
): Promise<Set<TPermission>> {
  const user = await getUserWithPermissions(userId);

  if (!user) {
    return new Set();
  }

  if (user.isSuperAdmin) {
    return new Set(Object.values(PERMISSIONS));
  }

  const permissions = new Set<TPermission>();

  // Права ролей
  for (const userRole of user.roles) {
    for (const rolePermission of userRole.role.permissions) {
      permissions.add(rolePermission.permission.name as TPermission);
    }
  }

  // Прямые права пользователя имеют приоритет
  for (const userPermission of user.permissions) {
    const permission = userPermission.permission.name as TPermission;

    if (userPermission.allowed) {
      permissions.add(permission);
    } else {
      permissions.delete(permission);
    }
  }

  return permissions;
}

export async function requirePermission(
  userId: string,
  permission: TPermission,
): Promise<void> {
  const allowed = await hasPermission(userId, permission);

  if (!allowed) {
    throw new AppError({
      status: ERROR_STATUS.FORBIDDEN,
      code: ERROR_CODES.FORBIDDEN,
      message: "Недостаточно прав",
      details: {},
    });
  }
}

//       isSuperAdmin?
//       /          \
//     да            нет
//     ↓              ↓
//  ALLOW       UserPermission?
//                 /       \
//              есть       нет
//               ↓          ↓
//          allowed    RolePermission?
//                       /       \
//                     есть       нет
//                      ↓          ↓
//                    ALLOW      DENY
