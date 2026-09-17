import axios from "axios";
import type { TApiErrorResponseDTO } from "./errors";

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<TApiErrorResponseDTO>(error)) {
    return error.response?.data.error?.message ?? "Произошла ошибка";
  }

  return "Произошла ошибка";
}
