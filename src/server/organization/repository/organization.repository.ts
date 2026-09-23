import type { PrismaTransaction } from '@/server/prisma';
import { prisma } from '@/server/prisma';
import type { OrganizationCreate } from '@/shared/api/organization';

export class OrganizationRepository {
  // Найти организацию
  async findById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
    });
  }

  // Найти все организации
  async findAll() {
    return prisma.organization.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Создать организацию
  async create(
    data: Omit<OrganizationCreate, "ownerIds">,
    tx: PrismaTransaction = prisma,
  ) {
    return tx.organization.create({
      data,
    });
  }

  // Обновить организацию
  async update(
    id: string,
    data: {
      name?: string;
      shortName?: string | null;
      inn?: string | null;
      kpp?: string | null;
      ogrn?: string | null;
      legalAddress?: string | null;
      phone?: string | null;
      email?: string | null;
      website?: string | null;
    },
  ) {
    return prisma.organization.update({
      where: { id },
      data,
    });
  }

  // Удалить организацию
  async delete(id: string) {
    return prisma.organization.delete({
      where: { id },
    });
  }

  // Проверить существование
  async exists(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    return organization !== null;
  }
}
