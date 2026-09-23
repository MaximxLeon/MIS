export const PERMISSIONS = {
  ADMIN_STATISTICS_READ: "admin-statistics.read",
  ADMIN_PERMISSIONS_READ: "admin-permissions.read",
  ADMIN_AUDIT_READ: "admin-audit.read",

  ORGANIZATION_READ: "organization.read",
  ORGANIZATION_CREATE: "organization.create",
  ORGANIZATION_UPDATE: "organization.update",
  ORGANIZATION_DELETE: "organization.delete",

  ORGANIZATION_READ_OWN: "organization.read.own",
  ORGANIZATION_UPDATE_OWN: "organization.update.own",
  ORGANIZATION_DELETE_OWN: "organization.delete.own",

  USER_READ: "user.read",
  USER_CREATE: "user.create",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",

  USER_READ_OWN: "user.read.own",
  USER_UPDATE_OWN: "user.update.own",

  ROLE_READ: "role.read",
  ROLE_CREATE: "role.create",
  ROLE_UPDATE: "role.update",
  ROLE_DELETE: "role.delete",
} as const;

export type TPermission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSION_LABEL: Record<TPermission, string> = {
  "admin-statistics.read": "Просмотр статистика платформы",
  "admin-permissions.read": "Просмотр прав платформы",
  "admin-audit.read": "Просмотр аудита платформы",

  "organization.read": "Просмотр организаций",
  "organization.read.own": "Просмотр своих организаций",

  "organization.create": "Создание организаций",

  "organization.update": "Редактирование организаций",
  "organization.update.own": "Редактирование своих организаций",

  "organization.delete": "Удаление организаций",
  "organization.delete.own": "Удаление своих организаций",

  "user.read": "Просмотр пользователей",
  "user.read.own": "Просмотр своего профиля",

  "user.create": "Создание пользователей",

  "user.update": "Редактирование пользователей",
  "user.update.own": "Редактирование своего профиля",

  "user.delete": "Удаление пользователей",

  "role.read": "Просмотр ролей",
  "role.create": "Создание ролей",
  "role.update": "Редактирование ролей",
  "role.delete": "Удаление ролей",
};
