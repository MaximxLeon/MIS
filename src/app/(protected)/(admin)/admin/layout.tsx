import type { ReactNode } from 'react';

import { requirePagePermission } from '@/server/auth/guards';
import { PERMISSIONS } from '@/shared/config/permissions';
import {
  AdminMobileSidebar,
} from '@/widgets/admin-sidebar/ui/admin-mobile-sidebar';
import { AdminSidebar } from '@/widgets/admin-sidebar/ui/admin-sidebar';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requirePagePermission([PERMISSIONS.ADMIN_PAGE_READ]);

  return (
    <div className="min-h-screen lg:flex">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <div className="block lg:hidden">
        <AdminMobileSidebar />
      </div>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
