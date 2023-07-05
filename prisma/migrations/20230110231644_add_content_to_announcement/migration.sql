/*
  Warnings:

  - Added the required column `content` to the `announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `content` LONGTEXT NOT NULL AFTER description;
