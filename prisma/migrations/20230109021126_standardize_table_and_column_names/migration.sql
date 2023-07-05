
-- AlterTable
ALTER TABLE users RENAME COLUMN job_position_id TO job_title_id;

-- RenameTable
RENAME TABLE job_position TO job_title;
RENAME TABLE announcements TO announcement;
RENAME TABLE benefits TO benefit;
RENAME TABLE positions TO position;
RENAME TABLE users TO user;
RENAME TABLE overtime_clicktime_reports TO overtime_clicktime_report;
RENAME TABLE overtime_rewards TO overtime_reward;
RENAME TABLE overtime_rewards_transactions TO overtime_reward_transaction;
RENAME TABLE overtime_rewards_users_balance TO overtime_reward_user_balance;
RENAME TABLE overtime_tasks TO overtime_task;
RENAME TABLE userModulePermission TO user_module_permission;
RENAME TABLE actionPermission TO action_permission;

-- CreateIndex
CREATE INDEX `user_job_title_FK` ON `user`(`job_title_id`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_job_title_FK` FOREIGN KEY (`job_title_id`) REFERENCES `job_title`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user_module_permission` RENAME INDEX `userModulePermission_module_id_user_id_key` TO `user_module_permission_module_id_user_id_key`;

-- DropForeignKey
ALTER TABLE `overtime_reward_user_balance` DROP FOREIGN KEY `overtime_rewards_users_balance_FK`;

-- AddForeignKey
ALTER TABLE `overtime_reward_user_balance` ADD CONSTRAINT `overtime_rewards_users_balance_FK` FOREIGN KEY (`user_balance_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
