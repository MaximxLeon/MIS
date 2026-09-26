import 'server-only';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { verifyPassword } from '@/server/auth/password';
import { AppError } from '@/server/errors';
import { userRepository } from '@/server/user/repository';
import type { TLoginDTO } from '@/shared/api/auth/dto';

export class LoginService {
  async execute(data: TLoginDTO) {
    const user = await userRepository.findByEmailOrPhone(
      data.identifier,
      data.identifier,
    );

    if (!user) {
      throw new AppError({
        status: ERROR_STATUS.UNAUTHORIZED,
        code: ERROR_CODES.UNAUTHORIZED,
        message: "Неверный email, номер телефона или пароль",
        details: {},
      });
    }

    const isPasswordValid = await verifyPassword(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError({
        status: ERROR_STATUS.UNAUTHORIZED,
        code: ERROR_CODES.UNAUTHORIZED,
        message: "Неверный email, номер телефона или пароль",
        details: {},
      });
    }

    return user;
  }
}

export const loginService = new LoginService();
