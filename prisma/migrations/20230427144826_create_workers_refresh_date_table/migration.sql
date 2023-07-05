-- CreateTable
CREATE TABLE `workers_refresh_dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finished_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
