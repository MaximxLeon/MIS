import { NextResponse } from 'next/server';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { registerService } from '@/server/auth/service';
import { createSession } from '@/server/auth/session';
import {
  AppError,
  handleApiError,
} from '@/server/errors';
import { mapUserToResponse } from '@/server/user';
import { registerSchema } from '@/shared/api/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      const errors: Record<string, string[]> = {};

      for (const issue of parsedBody.error.issues) {
        const field = issue.path.join(".") || "form";

        errors[field] ??= [];
        errors[field].push(issue.message);
      }

      throw new AppError({
        status: ERROR_STATUS.BAD_REQUEST,
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Некорректные данные",
        details: errors,
      });
    }

    const user = await registerService.execute(parsedBody.data);

    await createSession(user.id);

    return NextResponse.json(
      {
        user: mapUserToResponse(user),
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
