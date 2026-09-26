import 'server-only';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { hashPassword } from '@/server/auth/password';
import { AppError } from '@/server/errors';
import { userRepository } from '@/server/user/repository';
import type { TRegisterDTO } from '@/shared/api/auth/dto/register.request';

export class RegisterService {
  async execute(data: TRegisterDTO) {
    const existingUser = await userRepository.findByEmailOrPhone(
      data.email,
      data.phoneNumber,
    );

    if (existingUser?.email === data.email) {
      throw new AppError({
        status: ERROR_STATUS.CONFLICT,
        code: ERROR_CODES.EMAIL_ALREADY_EXISTS,
        message: "Пользователь с таким email уже существует",
        details: {},
      });
    }

    if (existingUser?.phoneNumber === data.phoneNumber) {
      throw new AppError({
        status: ERROR_STATUS.CONFLICT,
        code: ERROR_CODES.PHONE_ALREADY_EXISTS,
        message: "Пользователь с таким номером телефона уже существует",
        details: {},
      });
    }

    if (existingUser) {
      throw new AppError({
        status: ERROR_STATUS.CONFLICT,
        code: ERROR_CODES.USER_ALREADY_EXISTS,
        message: "Пользователь уже существует",
        details: {},
      });
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
