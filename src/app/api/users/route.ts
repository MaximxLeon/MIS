import { NextResponse } from 'next/server';

import { requireSession } from '@/server/auth';
import { requirePermission } from '@/server/auth/permissions';
import { handleApiError } from '@/server/errors';
import { mapUserToResponse } from '@/server/user/mapper';
import { userService } from '@/server/user/service';
import { UserListQueryDTO } from '@/shared/api/user';
import { PERMISSIONS } from '@/shared/config/permissions';

export async function GET(request: Request) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.USER_READ);

    const url = new URL(request.url);

    const query = UserListQueryDTO.parse({
      page: url.searchParams.get("page") ?? undefined,
      limit: url.searchParams.get("limit") ?? undefined,
      search: url.searchParams.get("search") ?? undefined,
    });

    const result = await userService.getMany(query);

    return NextResponse.json({
      items: result.items.map(mapUserToResponse),
      pagination: result.pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
