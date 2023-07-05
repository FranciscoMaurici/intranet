ALTER TABLE `workers_update_dates`
ADD COLUMN `started_at` DATETIME(0) NOT NULL AFTER `id`,
ADD COLUMN `executed_by` INTEGER NOT NULL AFTER `finished_at`;

ALTER TABLE `workers_update_dates`
ADD CONSTRAINT `fk_workers_update_dates_executed_by`
FOREIGN KEY (`executed_by`)
REFERENCES `user` (`id`);