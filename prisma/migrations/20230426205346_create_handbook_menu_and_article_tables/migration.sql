-- CreateTable
CREATE TABLE `handbook_group` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `handbook_article_id` INTEGER UNSIGNED NOT NULL,
    `handbook_sublist_id` INTEGER UNSIGNED NOT NULL,
    `handbook_menu_id` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `handbook_group_handbook_article_FK`(`handbook_article_id`),
    INDEX `handbook_group_handbook_sublist_FK`(`handbook_sublist_id`),
    INDEX `handbook_group_handbook_menu_FK`(`handbook_menu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `handbook_article` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `order` INTEGER UNSIGNED NOT NULL,
    `level` INTEGER UNSIGNED NOT NULL,
    `head_title` VARCHAR(250) NOT NULL,
    `menu_label` VARCHAR(100) NOT NULL,
    `anchor_name` VARCHAR(100) NOT NULL,
    `is_external` BOOLEAN NOT NULL DEFAULT false,
    `is_article` BOOLEAN NOT NULL DEFAULT false,
    `external_url` VARCHAR(100) NOT NULL,
    `article_slug` VARCHAR(100) NOT NULL,
    `h1_title` VARCHAR(250) NOT NULL,
    `subtitle` VARCHAR(250) NOT NULL,
    `short_description` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `parent_id` VARCHAR(100) NOT NULL,
    `menu_index` VARCHAR(50) NOT NULL,
    `access_level` INTEGER UNSIGNED NOT NULL,
    `meta` TEXT NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `handbook_sub_list` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `order` INTEGER UNSIGNED NOT NULL,
    `handbook_menu_id` INTEGER UNSIGNED NOT NULL,
    `menu_label` VARCHAR(50) NOT NULL,
    `anchor_name` VARCHAR(50) NOT NULL,
    `is_external` BOOLEAN NOT NULL DEFAULT false,
    `is_article` BOOLEAN NOT NULL DEFAULT false,
    `external_url` VARCHAR(100) NOT NULL,
    `article_slug` VARCHAR(50) NOT NULL,
    `access_level` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `handbook_sublist_handbook_menu_FK`(`handbook_menu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `handbook_menu` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `menu_label` VARCHAR(100) NOT NULL,
    `anchor_name` VARCHAR(50) NOT NULL,
    `order` INTEGER UNSIGNED NOT NULL,
    `access_level` INTEGER UNSIGNED NOT NULL,
    `article_slug` VARCHAR(50) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- AddForeignKey
ALTER TABLE `handbook_group` ADD CONSTRAINT `handbook_group_handbook_article_FK` FOREIGN KEY (`handbook_article_id`) REFERENCES `handbook_article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `handbook_group` ADD CONSTRAINT `handbook_group_handbook_sublist_FK` FOREIGN KEY (`handbook_sublist_id`) REFERENCES `handbook_sub_list`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `handbook_group` ADD CONSTRAINT `handbook_group_handbook_menu_FK` FOREIGN KEY (`handbook_menu_id`) REFERENCES `handbook_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `handbook_sub_list` ADD CONSTRAINT `handbook_sublist_handbook_menu_FK` FOREIGN KEY (`handbook_menu_id`) REFERENCES `handbook_menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
