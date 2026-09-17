import { z } from "zod";

const phoneSchema = z
  .string()
  .regex(/^\+7\d{10}$/, "Неверный формат номера телефона");

const emailSchema = z.email("Неверный формат email");

export const loginSchema = z.object({
  identifier: z
    .string()
    .refine(
      (value) =>
        emailSchema.safeParse(value).success ||
        phoneSchema.safeParse(value).success,
      "Введите корректный email или номер телефона",
    ),

  password: z.string().min(1, "Введите пароль"),
});

export type TLoginDTO = z.infer<typeof loginSchema>;
