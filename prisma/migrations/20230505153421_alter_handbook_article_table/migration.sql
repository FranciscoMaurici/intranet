/*
  Warnings:

  - You are about to drop the column `order` on the `handbook_article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `handbook_group_handbook_article_FK` ON `handbook_group`;

-- AlterTable
ALTER TABLE `handbook_article` DROP COLUMN `order`,
    ADD COLUMN `article_order` INTEGER UNSIGNED NULL,
    ADD COLUMN `selected_groups_only` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `title` TEXT NULL,
    ADD COLUMN `use_title_on_homepage` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `weight` INTEGER UNSIGNED NULL,
    MODIFY `level` INTEGER UNSIGNED NULL,
    MODIFY `head_title` TEXT NULL,
    MODIFY `menu_label` TEXT NULL,
    MODIFY `anchor_name` TEXT NULL,
    MODIFY `is_external` BOOLEAN NULL DEFAULT false,
    MODIFY `is_article` BOOLEAN NULL DEFAULT false,
    MODIFY `external_url` TEXT NULL,
    MODIFY `article_slug` VARCHAR(100) NULL,
    MODIFY `h1_title` VARCHAR(250) NULL,
    MODIFY `subtitle` VARCHAR(250) NULL,
    MODIFY `short_description` TEXT NULL,
    MODIFY `content` LONGTEXT NULL,
    MODIFY `parent_id` VARCHAR(100) NULL,
    MODIFY `menu_index` VARCHAR(50) NULL,
    MODIFY `access_level` INTEGER UNSIGNED NULL,
    MODIFY `meta` TEXT NULL,
    MODIFY `status` BOOLEAN NULL DEFAULT true;
