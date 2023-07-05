/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `roles_user_id_fkey`;

-- DropTable
DROP TABLE `roles`;

-- CreateTable
CREATE TABLE `actionPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `constant` VARCHAR(50) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `constant`(`constant`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `constant` VARCHAR(50) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    `menu` VARCHAR(100) NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `constant`(`constant`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userModulePermission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `module_id` INTEGER NOT NULL,
    `action_permission_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `action_permission_module_FK`(`action_permission_id`),
    INDEX `user_module_permission_module_FK`(`module_id`),
    INDEX `user_module_permission_user_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userModulePermission` ADD CONSTRAINT `action_permission_module_FK` FOREIGN KEY (`action_permission_id`) REFERENCES `actionPermission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userModulePermission` ADD CONSTRAINT `user_module_permission_module_FK` FOREIGN KEY (`module_id`) REFERENCES `module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userModulePermission` ADD CONSTRAINT `user_module_permission_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
