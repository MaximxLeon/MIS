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
  OrganizationCreateDTO,
} from '@/shared/api/organization/dto/organization-create.dto';
import { PERMISSIONS } from '@/shared/config/permissions';

const organizationService = new OrganizationService();

// Получить все организации
export async function GET() {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.ORGANIZATION_READ);

    const organizations = await organizationService.getAll();

    return NextResponse.json(organizations.map(mapOrganizationToResponse));
  } catch (error) {
    return handleApiError(error);
  }
}

// Создать организацию
export async function POST(request: Request) {
  try {
    const session = await requireSession();

    await requirePermission(session.userId, PERMISSIONS.ORGANIZATION_CREATE);

    const body = await request.json();

    const data = OrganizationCreateDTO.parse(body);

    const organization = await organizationService.create(data);

    return NextResponse.json(mapOrganizationToResponse(organization), {
      status: 201,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
