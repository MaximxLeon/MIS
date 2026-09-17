import { NextResponse } from "next/server";

import { requireSession, deleteAllSessions } from "@/server/auth/session";
import { handleApiError } from "@/server/api/errors";

export async function POST() {
  try {
    const session = await requireSession();

    await deleteAllSessions(session.userId);

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
