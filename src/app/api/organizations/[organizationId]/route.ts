import { NextResponse } from 'next/server';

import { requireSession } from '@/server/auth';
import { requirePermission } from '@/server/auth/permissions';
import { handleApiError } from '@/server/errors';
import {
  mapOrganizationToResponse,
} from '@/server/organization/mapper/organization.mapper';
import {
  OrganizationService,
} from '@/server/organization/service/organization.service';
import {
  OrganizationUpdateDTO,
} from '@/shared/api/organization/dto/organization-update.dto';
import { PERMISSIONS } from '@/shared/config/permissions';

const organizationService = new OrganizationService();

type OrganizationRouteContext = {
  params: Promise<{
    organizationId: string;
  }>;
};

// Получить организацию
export async function GET(
  _request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.ORGANIZATION_READ);

    const { organizationId } = await params;

    const organization = await organizationService.getById(organizationId);

    return NextResponse.json(mapOrganizationToResponse(organization));
  } catch (error) {
    return handleApiError(error);
  }
}

// Обновить организацию
export async function PATCH(
  request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.ORGANIZATION_UPDATE);

    const { organizationId } = await params;

    const body = await request.json();

    const data = OrganizationUpdateDTO.parse(body);

    const organization = await organizationService.update(organizationId, data);

    return NextResponse.json(mapOrganizationToResponse(organization));
  } catch (error) {
    return handleApiError(error);
  }
}

// Удалить организацию
export async function DELETE(
  _request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.ORGANIZATION_DELETE);

    const { organizationId } = await params;

    await organizationService.delete(organizationId);

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
