import "server-only";

import type { User } from "@/server/prisma/generated/prisma/client";

export function mapUserToResponse(user: User) {
  const fio = [user.family, user.name, user.patronymic]
    .filter(Boolean)
    .join(" ");
  return {
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,

    family: user.family,
    name: user.name,
    patronymic: user.patronymic,
    fio,

    birthDate: user.birthDate.toISOString(),

    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
