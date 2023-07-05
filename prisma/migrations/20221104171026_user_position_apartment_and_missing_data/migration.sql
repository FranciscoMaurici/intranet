/*
  Warnings:

  - You are about to drop the column `department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `department`,
    DROP COLUMN `position`,
    ADD COLUMN `associate_id` VARCHAR(50) NOT NULL DEFAULT '',
    ADD COLUMN `birth_date` DATETIME(3) NULL,
    ADD COLUMN `hire_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `job_department_id` INTEGER NULL,
    ADD COLUMN `job_position_id` INTEGER NULL,
    ADD COLUMN `location_code` VARCHAR(10) NOT NULL DEFAULT '',
    ADD COLUMN `reports_to` VARCHAR(250) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `job_position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `job_department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateIndex
CREATE INDEX `user_job_department_FK` ON `users`(`job_department_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `user_job_department_FK` FOREIGN KEY (`job_department_id`) REFERENCES job_department(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
