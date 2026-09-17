import { requireSession } from "@/server/auth/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return (
    <div className="min-h-screen">
      <header>{/* логотип, пользователь, выход */}</header>

      <main>{children}</main>
    </div>
  );
}
