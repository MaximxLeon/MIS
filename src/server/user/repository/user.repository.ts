import 'server-only';

import { prisma } from '@/server/prisma';
import { Prisma } from '@/server/prisma/generated/prisma/client';
import { ParsedUserListQuery } from '@/shared/api/user/dto';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhoneNumber(phoneNumber: string) {
    return prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  async findByEmailOrPhone(email: string, phoneNumber: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: {
        ...data,
        isSuperAdmin: false,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async findMany(query: ParsedUserListQuery) {
    const { page, limit, search } = query;

    const searchTerms = search?.trim().split(/\s+/).filter(Boolean);

    const where = searchTerms?.length
      ? {
          AND: searchTerms.map((term) => ({
            OR: [
              {
                family: {
                  contains: term,
                  mode: "insensitive" as const,
                },
              },
              {
                name: {
                  contains: term,
                  mode: "insensitive" as const,
                },
              },
              {
                patronymic: {
                  contains: term,
                  mode: "insensitive" as const,
                },
              },
              {
                email: {
                  contains: term,
                  mode: "insensitive" as const,
                },
              },
              {
                phoneNumber: {
                  contains: term,
                },
              },
            ],
          })),
        }
      : {};

    const [items, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export const userRepository = new UserRepository();
