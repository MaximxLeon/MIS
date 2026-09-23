import { ErrorCode } from '@/constants/error-codes';

type TApiErrorDetails =
  | Record<string, string[]>
  | Record<string, unknown>
  | unknown[];

type TAppErrorParams = {
  status: number;
  code: ErrorCode;
  message: string;
  details: TApiErrorDetails;
};

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly details?: unknown;

  constructor({ status, code, message, details }: TAppErrorParams) {
    super(message);

    this.name = "AppError";

    this.status = status;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
