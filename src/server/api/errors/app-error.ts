import { ErrorCode } from "@/constants/error-codes";

type AppErrorParams = {
  status: number;
  code: ErrorCode;
  message: string;
  details?: unknown;
};

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly details?: unknown;

  constructor({ status, code, message, details }: AppErrorParams) {
    super(message);

    this.name = "AppError";

    this.status = status;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
