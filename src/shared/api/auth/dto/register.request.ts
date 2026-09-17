import z from "zod";

export const registerSchema = z.object({
  email: z.email({
    message: "Введите корректный адрес почты",
  }),
  phoneNumber: z
    .string()
    .regex(/^\+7\d{10}$/, "Неверный формат номера телефона"),
  password: z
    .string({
      message: "Введите пароль, который содержит минимум 8 символов",
    })
    .min(8),
  family: z.string().optional(),
  name: z.string().optional(),
  patronymic: z.string().optional(),
  birthDate: z.iso.date({ message: "Введите корректную дату" }),
});

export type TRegisterDTO = z.infer<typeof registerSchema>;
