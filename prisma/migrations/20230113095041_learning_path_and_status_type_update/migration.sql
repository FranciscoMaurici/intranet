
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_job_department_FK`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `job_department_id`,
    ADD COLUMN `department_id` TINYINT UNSIGNED NULL DEFAULT NULL;

-- DropTable
DROP TABLE `job_department`;

-- CreateTable
CREATE TABLE `department` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Dictionary of departments';

-- CreateIndex
CREATE INDEX `user_department_FK` ON `user`(`department_id`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_department_FK` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;






-- AlterTable
ALTER TABLE `user` DROP FOREIGN KEY `user_job_title_FK`;
ALTER TABLE `user` DROP INDEX `user_job_title_FK`;

-- AlterTable
ALTER TABLE `user` CHANGE `job_title_id` `job_title_id` TINYINT UNSIGNED NULL DEFAULT NULL;

-- AlterTable
DROP TABLE `job_title`;

CREATE TABLE `job_title` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Dictionary of job titles';


-- AlterTable
ALTER TABLE `user` ADD CONSTRAINT `user_job_title_FK` FOREIGN KEY (`job_title_id`) REFERENCES `job_title`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;




-- NEW TABLES

-- CreateTable
CREATE TABLE `learning_path` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `stack_id` TINYINT UNSIGNED NOT NULL,
    `seniority_id` TINYINT UNSIGNED NOT NULL,
    `name` VARCHAR(250) NOT NULL COMMENT 'Cornerstone Name',
    `url` VARCHAR(250) NOT NULL COMMENT 'Cornerstone URL',
    `description` TEXT NOT NULL COMMENT 'Cornerstone description',
    `playlist` VARCHAR(250) NOT NULL COMMENT 'O''Reilly Playlist URL',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `seniority` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT='Dictionary of seniorities';

-- CreateTable
CREATE TABLE `stack` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `department_id` TINYINT UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT='Dictionary of stacks';





ALTER TABLE `stack` ADD CONSTRAINT `stack_department_FK` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 


ALTER TABLE `learning_path` ADD CONSTRAINT `learning_path_stack_FK` FOREIGN KEY (`stack_id`) REFERENCES `stack`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; 
ALTER TABLE `learning_path` ADD CONSTRAINT `learning_path_seniority_FK` FOREIGN KEY (`seniority_id`) REFERENCES `seniority`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
