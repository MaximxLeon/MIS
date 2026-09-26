import { NextResponse } from 'next/server';

import { requireSession } from '@/server/auth';
import { requirePermission } from '@/server/auth/permissions';
import { handleApiError } from '@/server/errors';
import { mapUserToResponse } from '@/server/user/mapper';
import { userService } from '@/server/user/service';
import { PERMISSIONS } from '@/shared/config/permissions';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.USER_READ);

    const { id } = await params;

    const user = await userService.getById(id);

    return NextResponse.json(mapUserToResponse(user));
  } catch (error) {
    return handleApiError(error);
  }
}
