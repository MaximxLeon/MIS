import {
  prisma,
  PrismaTransaction,
} from '@/server/prisma';

export class OrganizationOwnerRepository {
  // Найти связь пользователя с организацией
  async findById(organizationId: string, userId: string) {
    return prisma.organizationOwner.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  }

  // Найти всех владельцев организации
  async findByOrganizationId(organizationId: string) {
    return prisma.organizationOwner.findMany({
      where: {
        organizationId,
      },
      include: {
        user: true,
      },
    });
  }

  // Найти все организации пользователя
  async findByUserId(userId: string) {
    return prisma.organizationOwner.findMany({
      where: {
        userId,
      },
      include: {
        organization: true,
      },
    });
  }

  // Добавить владельца
  async create(
    organizationId: string,
    userId: string,
    tx: PrismaTransaction = prisma,
  ) {
    return tx.organizationOwner.create({
      data: {
        organizationId,
        userId,
      },
    });
  }

  // Удалить владельца
  async delete(organizationId: string, userId: string) {
    return prisma.organizationOwner.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  }

  // Проверить владение
  async isOwner(organizationId: string, userId: string) {
    const owner = await prisma.organizationOwner.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      select: {
        organizationId: true,
      },
    });

    return owner !== null;
  }
}
