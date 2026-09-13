import { NextResponse } from "next/server";

import { AppError } from "@/server/api/errors/app-error";
import { ApiErrorResponse } from "@/shared/api/error.schema";
import { ERROR_CODES } from "@/constants/error-codes";
import { ERROR_STATUS } from "@/constants/error-status";

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    const body: ApiErrorResponse = {
      error: {
        status: error.status,
        code: error.code,
        message: error.message,
        details: error.details ?? {},
      },
    };

    return NextResponse.json(body, {
      status: error.status,
    });
  }

  console.error(error);

  const body: ApiErrorResponse = {
    error: {
      status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Внутренняя ошибка сервера",
      details: {},
    },
  };

  return NextResponse.json(body, {
    status: 500,
  });
}
