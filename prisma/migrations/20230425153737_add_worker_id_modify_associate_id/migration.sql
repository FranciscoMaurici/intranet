-- AlterTable
ALTER TABLE `user` ADD COLUMN `worker_id` CHAR(9) NOT NULL DEFAULT '',
    MODIFY `associate_id` CHAR(16) NOT NULL DEFAULT '';
