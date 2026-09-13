import "server-only";

import type { TRegisterDTO } from "@/shared/api/auth/register.schema";
import { hashPassword } from "@/server/auth/password";
import { userRepository } from "@/server/api/user";

export class RegisterService {
  async execute(data: TRegisterDTO) {
    const existingUser = await userRepository.findByEmailOrPhone(
      data.email,
      data.phoneNumber,
    );

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error("Пользователь с таким email уже существует");
      }

      if (existingUser.phoneNumber === data.phoneNumber) {
        throw new Error("Пользователь с таким номером телефона уже существует");
      }

      throw new Error("Пользователь уже существует");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await userRepository.create({
      email: data.email,
      phoneNumber: data.phoneNumber,
      passwordHash,
      family: data.family,
      name: data.name,
      patronymic: data.patronymic,
      birthDate: new Date(`${data.birthDate}T00:00:00.000Z`),
    });

    return user;
  }
}

export const registerService = new RegisterService();
