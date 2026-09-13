import { ErrorCode } from "@/constants/error-codes";

export type ApiErrorResponse = {
  error: {
    status: number;
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
};
