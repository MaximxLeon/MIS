"use client";

import Link from 'next/link';

import {
  DeleteOrganizationButton,
} from '@/features/organization/delete-organization/ui';
import type {
  OrganizationsQuery,
} from '@/shared/api/graphql/generated/graphql';
import {
  PERMISSIONS,
  type TPermission,
} from '@/shared/config/permissions';
import { createPermissionChecker } from '@/shared/lib';

type Organization = OrganizationsQuery["organizations"][number];

type OrganizationsListProps = {
  organizations: Organization[];
  permissions?: TPermission[];
  currentUserId?: string;
};

export function OrganizationsList({
  organizations,
  permissions = [],
  currentUserId,
}: OrganizationsListProps) {
  const { can } = createPermissionChecker(permissions);

  const canDeleteAll = can(PERMISSIONS.ORGANIZATION_DELETE);

  const canDeleteOwn = can(PERMISSIONS.ORGANIZATION_DELETE_OWN);

  if (organizations.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-border bg-card px-6 py-10 text-center">
        <p className="text-sm text-text-muted">Список организаций пуст</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {organizations.map((organization) => {
        const isOwner = organization.owners.some(
          (owner) => owner.id === currentUserId,
        );

        const canDelete = canDeleteAll || (canDeleteOwn && isOwner);

        return (
          <article
            key={organization.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card-hover"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-primary opacity-70 transition-opacity group-hover:opacity-100" />

            <div className="pl-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-heading">
                    {organization.name}
                  </h2>

                  {organization.shortName && (
                    <p className="mt-1 text-sm text-text-muted">
                      {organization.shortName}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {organization.inn && (
                    <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-active">
                      ИНН {organization.inn}
                    </span>
                  )}

                  <DeleteOrganizationButton
                    organizationId={organization.id}
                    canDelete={canDelete}
                  />
                </div>
              </div>

              {organization.owners.length > 0 ? (
                <div className="mt-5 border-t border-divider pt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                    Владельцы
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {organization.owners.map((owner) => (
                      <Link
                        key={owner.id}
                        href={`/users/${owner.id}`}
                        className="rounded-lg bg-muted-bg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary-light hover:text-primary-active"
                      >
                        {owner.fio}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-5 border-t border-divider pt-4">
                  <p className="text-sm text-text-muted">
                    Владельцы не назначены
                  </p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
