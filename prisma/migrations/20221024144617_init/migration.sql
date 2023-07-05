-- CreateTable
CREATE TABLE `announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(250) NOT NULL,
    `title` VARCHAR(250) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(250) NULL,
    `last_updated_by` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isActive` VARCHAR(50) NOT NULL DEFAULT 'active',

    INDEX `users_email_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(250) NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `last_name` VARCHAR(50) NULL,
    `country` VARCHAR(60) NULL,
    `department` VARCHAR(70) NULL,
    `position` VARCHAR(70) NULL,
    `avatar` VARCHAR(250) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` VARCHAR(50) NOT NULL DEFAULT 'active',

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `announcement_view` BOOLEAN NOT NULL DEFAULT true,
    `announcement_create` BOOLEAN NOT NULL DEFAULT false,
    `announcement_edit` BOOLEAN NOT NULL DEFAULT false,
    `announcement_delete` BOOLEAN NOT NULL DEFAULT false,
    `position_view` BOOLEAN NOT NULL DEFAULT true,
    `position_create` BOOLEAN NOT NULL DEFAULT false,
    `position_edit` BOOLEAN NOT NULL DEFAULT false,
    `position_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `benefit_view` BOOLEAN NOT NULL DEFAULT true,
    `benefit_create` BOOLEAN NOT NULL DEFAULT false,
    `benefit_edit` BOOLEAN NOT NULL DEFAULT false,
    `benefit_delete` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `roles_user_id_key`(`user_id`),
    UNIQUE INDEX `roles_user_email_key`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `client` VARCHAR(100) NOT NULL,
    `openings` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `position_id` VARCHAR(130) NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_fkey`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `benefits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `title` VARCHAR(45) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `location` VARCHAR(3) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `benefit_id_UNIQUE`(`id`),
    INDEX `category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `benefits_categories` (
    `benefits_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(45) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`benefits_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `overtime_clicktime_reports` (
    `clicktime_report_id` BIGINT NOT NULL AUTO_INCREMENT,
    `clicktime_report_register_number` BIGINT NOT NULL,
    `processing_status` VARCHAR(100) NULL DEFAULT 'RECEIVED',
    `file_name` VARCHAR(100) NOT NULL,
    `file_content` BLOB NOT NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `overtime_clicktime_reports_UN`(`clicktime_report_register_number`),
    PRIMARY KEY (`clicktime_report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `overtime_rewards` (
    `reward_id` BIGINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `amount` INTEGER NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `reward_image_url` VARCHAR(500) NULL,

    PRIMARY KEY (`reward_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `overtime_rewards_transactions` (
    `transaction_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `transaction_type` VARCHAR(100) NULL,
    `overtime_reward_id` BIGINT NULL,
    `overtime_task_id` BIGINT NULL,
    `transaction_amount` DOUBLE NOT NULL,
    `transaction_date` DATETIME(0) NOT NULL,
    `user_balance_subtotal` DOUBLE NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `task_hours` FLOAT NULL,
    `overtime_task_code` VARCHAR(100) NULL,
    `transaction_approval_date` DATETIME(0) NOT NULL,
    `user_department_name` VARCHAR(300) NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `overtime_task_name` VARCHAR(100) NULL,
    `overtime_reward_description` VARCHAR(250) NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `overtime_rewards_users_balance` (
    `user_balance_id` INTEGER NOT NULL,
    `rewards_points_balance` DOUBLE NOT NULL DEFAULT 0,
    `rewards_expiration_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_balance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- CreateTable
CREATE TABLE `overtime_tasks` (
    `overtime_task_id` BIGINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `project` VARCHAR(100) NOT NULL,
    `client_name` VARCHAR(100) NOT NULL,
    `points_per_hour` INTEGER NOT NULL DEFAULT 100,
    `clicktime_code` VARCHAR(100) NOT NULL,
    `enabled` TINYINT NOT NULL DEFAULT 1,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `overtime_tasks_UN`(`clicktime_code`),
    PRIMARY KEY (`overtime_task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- AddForeignKey
ALTER TABLE `announcements` ADD CONSTRAINT `users_email_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `benefits` ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `benefits_categories`(`benefits_category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `overtime_rewards_users_balance` ADD CONSTRAINT `overtime_rewards_users_balance_FK` FOREIGN KEY (`user_balance_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
