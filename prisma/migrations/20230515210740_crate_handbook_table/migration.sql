/*
  Warnings:

  - You are about to alter the column `status` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `TinyInt`.
  - You are about to drop the `handbook_article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `handbook_menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `handbook_menu` DROP FOREIGN KEY `handbook_menu_handbook_menu_FK`;


-- DropTable
DROP TABLE `handbook_article`;

-- DropTable
DROP TABLE `handbook_menu`;

-- CreateTable
CREATE TABLE `handbook` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `menu_label` VARCHAR(100) NULL,
    `head_title` TEXT NULL,
    `h1_title` TEXT NULL,
    `title` TEXT NULL,
    `subtitle` TEXT NULL,
    `order` TINYINT UNSIGNED NOT NULL,
    `is_article` BOOLEAN NULL,
    `parent_id` SMALLINT UNSIGNED NULL,
    `slug` VARCHAR(50) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `is_external` TEXT NULL,
    `external_url` TEXT NULL,
    `short_description` TEXT NULL,
    `content` TEXT NULL,
    `menu_index` TEXT NULL,
    `weight` TEXT NULL,
    `level` INTEGER NULL,

    INDEX `handbook_menu_handbook_menu_FK`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- AddForeignKey
ALTER TABLE `handbook` ADD CONSTRAINT `handbook_handbook_FK` FOREIGN KEY (`parent_id`) REFERENCES `handbook`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
