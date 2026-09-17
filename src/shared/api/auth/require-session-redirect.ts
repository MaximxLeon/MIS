// shared/api/auth/require-session-redirect.ts
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

export async function requireSessionRedirect() {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return session;
}
