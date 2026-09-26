import 'server-only';

import { redirect } from 'next/navigation';

import { requireSession } from '@/server/auth';
import { getUserPermissions } from '@/server/auth/permissions';
import type { TPermission } from '@/shared/config/permissions';

export async function requirePagePermission(
  permissions: TPermission[],
): Promise<void> {
  const session = await requireSession();

  const userPermissions = await getUserPermissions(session.userId);

  const hasPermission = permissions.some((permission) =>
    userPermissions.has(permission),
  );

  if (!hasPermission) {
    redirect("/");
  }
}
