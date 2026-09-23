/*
  Warnings:

  - Made the column `is_super_admin` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "is_super_admin" SET NOT NULL,
ALTER COLUMN "is_super_admin" SET DEFAULT false;
