-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `announcement_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(250) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `comment_announcement_FK`(`announcement_id`),
    INDEX `comment_user_FK`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_announcement_FK` FOREIGN KEY (`announcement_id`) REFERENCES `announcement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
