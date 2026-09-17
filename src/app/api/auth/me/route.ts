import { NextResponse } from "next/server";

import { requireSession } from "@/server/auth/session";
import { mapUserToResponse } from "@/server/api/user";
import { handleApiError } from "@/server/api/errors";

export async function GET() {
  try {
    const session = await requireSession();

    return NextResponse.json({
      user: mapUserToResponse(session.user),
    });
  } catch (error) {
    return handleApiError(error);
  }
}