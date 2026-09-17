import { z } from "zod";
import { userResponseDTO } from "@/shared/api/user"

export const AuthResponseDto = z.object({
  user: userResponseDTO,
});

export type TAuthResponseDTO = z.infer<typeof AuthResponseDto>;
