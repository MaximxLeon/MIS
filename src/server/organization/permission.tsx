import {
  ERROR_CODES,
  ERROR_STATUS,
} from '@/constants';
import { requirePermission } from '@/server/auth/permissions';
import { AppError } from '@/server/errors';
import { OrganizationService } from '@/server/organization/service';
import type { TPermission } from '@/shared/config/permissions';

const organizationService = new OrganizationService();

export async function requireOrganizationPermission(
  userId: string,
  organizationId: string,
  permission: TPermission,
  ownPermission: TPermission,
) {
  try {
    await requirePermission(userId, permission);

    return;
  } catch {
    await requirePermission(userId, ownPermission);
  }

  const isOwner = await organizationService.isOwner(organizationId, userId);

  if (!isOwner) {
    throw new AppError({
      status: ERROR_STATUS.FORBIDDEN,
      code: ERROR_CODES.FORBIDDEN,
      message: "Недостаточно прав для выполнения операции",
      details: {},
    });
  }
}
