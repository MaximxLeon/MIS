import { SidebarMobile } from '@/shared/ui/sidebar';

import { getAdminSidebarItems } from './lib/get-admin-sidebar-items';

export async function AdminMobileSidebar() {
  const items = await getAdminSidebarItems();

  return <SidebarMobile title="Администрирование" items={items} />;
}
