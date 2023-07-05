-- CreateTable
CREATE TABLE `reaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `icon` VARCHAR(250) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `reaction_announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reaction_id` INTEGER NOT NULL,
    `announcement_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `reaction_announcement_announcement_FK`(`announcement_id`),
    INDEX `reaction_announcement_reaction_FK`(`reaction_id`),
    INDEX `reaction_announcement_user_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- CreateTable
CREATE TABLE `reaction_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reaction_id` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `reaction_comment_comment_FK`(`comment_id`),
    INDEX `reaction_comment_reaction_FK`(`reaction_id`),
    INDEX `reaction_comment_user_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- AddForeignKey
ALTER TABLE `reaction_announcement` ADD CONSTRAINT `reaction_announcement_announcement_FK` FOREIGN KEY (`announcement_id`) REFERENCES `announcement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reaction_announcement` ADD CONSTRAINT `reaction_announcement_reaction_FK` FOREIGN KEY (`reaction_id`) REFERENCES `reaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reaction_announcement` ADD CONSTRAINT `reaction_announcement_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reaction_comment` ADD CONSTRAINT `reaction_comment_comment_FK` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reaction_comment` ADD CONSTRAINT `reaction_comment_reaction_FK` FOREIGN KEY (`reaction_id`) REFERENCES `reaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reaction_comment` ADD CONSTRAINT `reaction_comment_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
