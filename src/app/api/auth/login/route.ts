import { NextResponse } from "next/server";

import { loginSchema } from "@/shared/api/auth";
import { createSession } from "@/server/auth/session";
import { mapUserToResponse } from "@/server/api/user";
import { AppError } from "@/server/api/errors/app-error";
import { handleApiError } from "@/server/api/errors";

import { ERROR_CODES } from "@/constants/error-codes";
import { ERROR_STATUS } from "@/constants/error-status";
import { loginService } from "@/server/auth/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = loginSchema.safeParse(body);

    if (!parsedBody.success) {
      const details: Record<string, string[]> = {};

      for (const issue of parsedBody.error.issues) {
        const field = issue.path.join(".") || "form";

        details[field] ??= [];
        details[field].push(issue.message);
      }

      throw new AppError({
        status: ERROR_STATUS.VALIDATION_ERROR,
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Некорректные данные",
        details,
      });
    }

    const user = await loginService.execute(parsedBody.data);

    await createSession(user.id);

    return NextResponse.json({
      user: mapUserToResponse(user),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
