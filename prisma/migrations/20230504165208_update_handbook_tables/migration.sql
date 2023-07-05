/*
  Warnings:

  - The primary key for the `handbook_menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access_level` on the `handbook_menu` table. All the data in the column will be lost.
  - You are about to drop the column `anchor_name` on the `handbook_menu` table. All the data in the column will be lost.
  - You are about to drop the column `article_slug` on the `handbook_menu` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `handbook_menu` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `UnsignedSmallInt`.
  - You are about to alter the column `order` on the `handbook_menu` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `UnsignedTinyInt`.

*/
-- DropForeignKey
ALTER TABLE `handbook_group` DROP FOREIGN KEY `handbook_group_handbook_article_FK`;

-- DropForeignKey
ALTER TABLE `handbook_group` DROP FOREIGN KEY `handbook_group_handbook_menu_FK`;

-- DropForeignKey
ALTER TABLE `handbook_group` DROP FOREIGN KEY `handbook_group_handbook_sublist_FK`;

-- DropForeignKey
ALTER TABLE `handbook_sub_list` DROP FOREIGN KEY `handbook_sublist_handbook_menu_FK`;

-- AlterTable
ALTER TABLE `comment` MODIFY `content` VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE `handbook_group` MODIFY `id` INTEGER UNSIGNED NOT NULL,
    MODIFY `name` VARCHAR(100) NULL,
    MODIFY `status` BOOLEAN NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    ALTER COLUMN `created_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `handbook_menu` DROP PRIMARY KEY,
    DROP COLUMN `access_level`,
    DROP COLUMN `anchor_name`,
    DROP COLUMN `article_slug`,
    ADD COLUMN `is_article` BOOLEAN NULL,
    ADD COLUMN `parent_id` SMALLINT UNSIGNED NULL,
    ADD COLUMN `slug` VARCHAR(50) NULL,
    MODIFY `id` SMALLINT UNSIGNED NOT NULL,
    MODIFY `menu_label` VARCHAR(100) NULL,
    MODIFY `order` TINYINT UNSIGNED NOT NULL,
    MODIFY `status` BOOLEAN NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    ALTER COLUMN `created_at` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `handbook_sub_list` MODIFY `id` INTEGER UNSIGNED NOT NULL,
    MODIFY `menu_label` VARCHAR(50) NULL,
    MODIFY `anchor_name` VARCHAR(50) NULL,
    MODIFY `is_external` BOOLEAN NULL,
    MODIFY `is_article` BOOLEAN NULL,
    MODIFY `external_url` VARCHAR(100) NULL,
    MODIFY `article_slug` VARCHAR(50) NULL,
    MODIFY `status` BOOLEAN NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    ALTER COLUMN `created_at` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `handbook_menu_handbook_menu_FK` ON `handbook_menu`(`parent_id`);

-- AddForeignKey
ALTER TABLE `handbook_menu` ADD CONSTRAINT `handbook_menu_handbook_menu_FK` FOREIGN KEY (`parent_id`) REFERENCES `handbook_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO module
(description, constant, `path`, menu, updated_at, created_at)
VALUES('Handbook', 'HANDBOOK', '/handbook', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
