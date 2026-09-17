import { z } from "zod";

export const userResponseDTO = z.object({
  id: z.string(),

  email: z.email(),
  phoneNumber: z.string(),

  family: z.string().nullable(),
  name: z.string().nullable(),
  patronymic: z.string().nullable(),

  fio: z.string(),

  birthDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TUserResponseDTO = z.infer<typeof userResponseDTO>;
