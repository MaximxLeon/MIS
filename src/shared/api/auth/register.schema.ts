import z from "zod";

export const registerSchema = z.object({
  email: z.email(),
  phoneNumber: z
    .string()
    .regex(/^\+7\d{10}$/, "Неверный формат номера телефона"),
  password: z.string().min(8),
  family: z.string().optional(),
  name: z.string().optional(),
  patronymic: z.string().optional(),
  birthDate: z.iso.date(),
});

export type TRegisterDTO = z.infer<typeof registerSchema>;
