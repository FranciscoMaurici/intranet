/*
  Warnings:

  - You are about to drop the column `isActive` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `benefits` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `benefits_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `benefits` DROP FOREIGN KEY `category_id`;

-- DropIndex
DROP INDEX `roles_user_email_key` ON `roles`;

-- AlterTable
ALTER TABLE `announcements` DROP COLUMN `isActive`,
    ADD COLUMN `is_active` VARCHAR(50) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `benefits` DROP COLUMN `category_id`;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `user_email`;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `VerificationToken`;

-- DropTable
DROP TABLE `benefits_categories`;
