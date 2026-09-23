import 'server-only';

import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { AppError } from '@/server/errors';
import { userRepository } from '@/server/user';
import { ParsedUserListQuery } from '@/shared/api/user/dto/user-list.query';

export class UserService {
  async getById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError({
        status: ERROR_STATUS.NOT_FOUND,
        code: ERROR_CODES.NOT_FOUND,
        message: "Пользователь не найден",
        details: {},
      });
    }

    return user;
  }

  async getMany(query: ParsedUserListQuery) {
    const result = await userRepository.findMany(query);

    return {
      items: result.items,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNextPage: result.page < result.totalPages,
        hasPreviousPage: result.page > 1,
      },
    };
  }
}

export const userService = new UserService();
