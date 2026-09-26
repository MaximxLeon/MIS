"use client";

import { useState } from 'react';

import { useMyOrganizationsQuery } from '@/entities/organization/model';
import {
  useOrganizationsWithOwnersQuery,
} from '@/entities/organization/model/';
import {
  OrganizationsError,
  OrganizationsList,
  OrganizationsLoading,
} from '@/entities/organization/ui';
import {
  CreateOrganizationForm,
} from '@/features/organization/create-organization/ui';
import type { TPermission } from '@/shared/config/permissions';
import { PERMISSIONS } from '@/shared/config/permissions';
import { createPermissionChecker } from '@/shared/lib';
import {
  Button,
  Dialog,
} from '@/shared/ui/kit';

type OrganizationsPageProps = {
  permissions: TPermission[];
  currentUserId?: string;
};

export default function OrganizationsPage({
  permissions, currentUserId,
}: OrganizationsPageProps) {
  const [open, setOpen] = useState(false);

  const { can } = createPermissionChecker(permissions);

  const canReadAll = can(PERMISSIONS.ORGANIZATION_READ);

  const canReadOwn = can(PERMISSIONS.ORGANIZATION_READ_OWN);

  const {
    data: allData,
    isLoading: isLoadingAll,
    error: allError,
  } = useOrganizationsWithOwnersQuery({
    enabled: canReadAll,
  });

  const {
    data: ownData,
    isLoading: isLoadingOwn,
    error: ownError,
  } = useMyOrganizationsQuery({
    enabled: !canReadAll && canReadOwn,
  });
  
  if (isLoadingAll || isLoadingOwn) {
    return <OrganizationsLoading />;
  }

  if (allError || ownError) {
    return <OrganizationsError />;
  }

  const organizations = canReadAll
    ? (allData?.organizations ?? [])
    : (ownData?.myOrganizations ?? []);

  return (
    <main className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-heading text-2xl font-bold">Организации</h1>

        {can(PERMISSIONS.ORGANIZATION_CREATE) && (
          <Button type="button" onClick={() => setOpen(true)} size="short">
            Добавить организацию
          </Button>
        )}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Создать организацию"
      >
        <CreateOrganizationForm onSuccess={() => setOpen(false)} />
      </Dialog>

      <OrganizationsList organizations={organizations} currentUserId={currentUserId} permissions={permissions} />
    </main>
  );
}
