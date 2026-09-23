import { Sidebar } from '@/shared/ui/sidebar';

import { getAdminSidebarItems } from './lib/get-admin-sidebar-items';

export async function AdminSidebar() {
  const items = await getAdminSidebarItems();

  return <Sidebar title="Администрирование" items={items} />;
}
