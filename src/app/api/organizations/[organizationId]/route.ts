import { NextResponse } from 'next/server';

import { requireSession } from '@/server/auth';
import { handleApiError } from '@/server/errors';
import { requireOrganizationPermission } from '@/server/organization';
import { mapOrganizationToResponse } from '@/server/organization/mapper';
import { OrganizationService } from '@/server/organization/service';
import { OrganizationUpdateDTO } from '@/shared/api/organization/dto';
import { PERMISSIONS } from '@/shared/config/permissions';

const organizationService = new OrganizationService();

type OrganizationRouteContext = {
  params: Promise<{
    organizationId: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();
    const { organizationId } = await params;

    await requireOrganizationPermission(
      session.userId,
      organizationId,
      PERMISSIONS.ORGANIZATION_READ,
      PERMISSIONS.ORGANIZATION_READ_OWN,
    );

    const organization = await organizationService.getById(organizationId);

    return NextResponse.json(mapOrganizationToResponse(organization));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();
    const { organizationId } = await params;

    await requireOrganizationPermission(
      session.userId,
      organizationId,
      PERMISSIONS.ORGANIZATION_UPDATE,
      PERMISSIONS.ORGANIZATION_UPDATE_OWN,
    );

    const body = await request.json();
    const data = OrganizationUpdateDTO.parse(body);

    const organization = await organizationService.update(organizationId, data);

    return NextResponse.json(mapOrganizationToResponse(organization));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: OrganizationRouteContext,
) {
  try {
    const session = await requireSession();
    const { organizationId } = await params;

    await requireOrganizationPermission(
      session.userId,
      organizationId,
      PERMISSIONS.ORGANIZATION_DELETE,
      PERMISSIONS.ORGANIZATION_DELETE_OWN,
    );

    await organizationService.delete(organizationId);

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
