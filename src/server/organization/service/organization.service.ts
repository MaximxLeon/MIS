import { ERROR_CODES } from '@/constants/error-codes';
import { ERROR_STATUS } from '@/constants/error-status';
import { AppError } from '@/server/errors';
import {
  OrganizationOwnerRepository,
} from '@/server/organization/repository/organization-owner.repository';
import {
  OrganizationRepository,
} from '@/server/organization/repository/organization.repository';
import { prisma } from '@/server/prisma';
import { Prisma } from '@/server/prisma/generated/prisma/client';
import type {
  OrganizationCreate,
} from '@/shared/api/organization/dto/organization-create.dto';
import type {
  OrganizationUpdate,
} from '@/shared/api/organization/dto/organization-update.dto';

export class OrganizationService {
  private readonly organizationRepository = new OrganizationRepository();

  private readonly organizationOwnerRepository =
    new OrganizationOwnerRepository();

  // Получить организацию
  async getById(id: string) {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new AppError({
        status: ERROR_STATUS.NOT_FOUND,
        code: ERROR_CODES.NOT_FOUND,
        message: "Организация не найдена",
        details: {},
      });
    }

    return organization;
  }

  // Получить все организации
  async getAll() {
    return this.organizationRepository.findAll();
  }

  // Получить организации пользователя
  async getAllForUser(userId: string) {
    const owners = await this.organizationOwnerRepository.findByUserId(userId);

    return owners.map((owner) => owner.organization);
  }

  // Создать организацию
  async create(data: OrganizationCreate) {
    const { ownerIds, ...organizationData } = data;

    try {
      return await prisma.$transaction(async (tx) => {
        const organization = await this.organizationRepository.create(
          organizationData,
          tx,
        );

        if (ownerIds?.length) {
          for (const userId of ownerIds) {
            await this.organizationOwnerRepository.create(
              organization.id,
              userId,
              tx,
            );
          }
        }

        return organization;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new AppError({
            status: ERROR_STATUS.CONFLICT,
            code: ERROR_CODES.CONFLICT,
            message: "Организация с такими данными уже существует",
            details: {},
          });
        }
      }

      throw error;
    }
  }

  // Обновить организацию
  async update(id: string, data: OrganizationUpdate) {
    try {
      return await this.organizationRepository.update(id, data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new AppError({
            status: ERROR_STATUS.CONFLICT,
            code: ERROR_CODES.CONFLICT,
            message: "Организация с такими данными уже существует",
            details: {},
          });
        }

        if (error.code === "P2025") {
          throw new AppError({
            status: ERROR_STATUS.NOT_FOUND,
            code: ERROR_CODES.NOT_FOUND,
            message: "Организация не найдена",
            details: {},
          });
        }
      }

      throw error;
    }
  }

  // Удалить организацию
  async delete(id: string) {
    try {
      return await this.organizationRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new AppError({
            status: ERROR_STATUS.NOT_FOUND,
            code: ERROR_CODES.NOT_FOUND,
            message: "Организация не найдена",
            details: {},
          });
        }
      }

      throw error;
    }
  }

  // Добавить владельца
  async addOwner(organizationId: string, userId: string) {
    try {
      return await this.organizationOwnerRepository.create(
        organizationId,
        userId,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new AppError({
            status: ERROR_STATUS.CONFLICT,
            code: ERROR_CODES.CONFLICT,
            message: "Пользователь уже является владельцем",
            details: {},
          });
        }

        if (error.code === "P2003") {
          throw new AppError({
            status: ERROR_STATUS.NOT_FOUND,
            code: ERROR_CODES.NOT_FOUND,
            message: "Пользователь или организация не найдены",
            details: {},
          });
        }
      }

      throw error;
    }
  }

  // Удалить владельца
  async removeOwner(organizationId: string, userId: string) {
    try {
      return await this.organizationOwnerRepository.delete(
        organizationId,
        userId,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new AppError({
            status: ERROR_STATUS.NOT_FOUND,
            code: ERROR_CODES.NOT_FOUND,
            message: "Владелец не найден",
            details: {},
          });
        }
      }

      throw error;
    }
  }

  // Проверить владельца
  async isOwner(organizationId: string, userId: string) {
    return this.organizationOwnerRepository.isOwner(organizationId, userId);
  }
}
