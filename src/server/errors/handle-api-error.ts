import { NextResponse } from 'next/server';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { AppError } from '@/server/errors';
import type { TApiErrorResponseDTO } from '@/shared/api/errors';

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    const body: TApiErrorResponseDTO = {
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

  console.error("Unhandled API error:", error);

  const body: TApiErrorResponseDTO = {
    error: {
      status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: "Внутренняя ошибка сервера",
      details: {},
    },
  };

  return NextResponse.json(body, {
    status: ERROR_STATUS.INTERNAL_SERVER_ERROR,
  });
}
