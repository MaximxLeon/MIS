import { requireSession } from '@/server/auth';
import { mapUserPermissionsToNames } from '@/shared/lib';

import OrganizationsPage from './ui/organization-page';

export default async function Page() {
  const session = await requireSession();

  // Получаем сессию и права пользователя
  const permissions = mapUserPermissionsToNames(session.user.permissions);

  return <OrganizationsPage permissions={permissions} currentUserId={session.userId} />;
}
