import {
  requireSession,
  requireSuperAdmin,
} from '@/server/auth';

export default async function Admin() {
  const session = await requireSession();
  const isSuperAdmin = await requireSuperAdmin(session.userId);

  return (
    <main>
      <h1>Организации</h1>

      {isSuperAdmin && (
        <p>Вы супер-администратор</p>
      )}
    </main>
  );
}