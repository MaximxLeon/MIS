import type { ReactNode } from 'react';

import { requirePagePermission } from '@/server/auth/guards';
import { PERMISSIONS } from '@/shared/config/permissions';

type OrganizationLayoutProps = {
  children: ReactNode;
};

export default async function OrganizationLayout({
  children,
}: OrganizationLayoutProps) {
  await requirePagePermission([
    PERMISSIONS.ORGANIZATION_READ,
    PERMISSIONS.ORGANIZATION_READ_OWN
  ]
  );

  return <>{children}</>;
}