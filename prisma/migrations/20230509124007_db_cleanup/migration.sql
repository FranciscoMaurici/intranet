-- Add default values to updated_at, created_at and status
ALTER TABLE handbook_menu MODIFY COLUMN updated_at datetime DEFAULT CURRENT_TIMESTAMP  on update CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE handbook_menu MODIFY COLUMN created_at datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL;
ALTER TABLE handbook_menu MODIFY COLUMN status tinyint(1) DEFAULT 1 NOT NULL;

-- Reorder columns
ALTER TABLE handbook_menu CHANGE status status tinyint(1) DEFAULT 1 NOT NULL AFTER slug;
ALTER TABLE handbook_menu CHANGE updated_at updated_at datetime DEFAULT CURRENT_TIMESTAMP  on update CURRENT_TIMESTAMP NOT NULL AFTER status;
ALTER TABLE handbook_menu CHANGE created_at created_at datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL AFTER status;

-- Delete usused handbook tables
DROP TABLE handbook_group;
DROP TABLE handbook_sub_list;

-- RIP In Peace, Overtime Rewards Program
DROP TABLE overtime_clicktime_report;
DROP TABLE overtime_reward;
DROP TABLE overtime_reward_transaction;
DROP TABLE overtime_reward_user_balance;
DROP TABLE overtime_task;

-- Change user.status to boolean, default 1
ALTER TABLE user MODIFY COLUMN status varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active' NULL;
UPDATE user SET status = NULL;
ALTER TABLE user MODIFY COLUMN status BOOL DEFAULT 1 NULL;
UPDATE user SET status = true;
ALTER TABLE user MODIFY COLUMN status BOOL DEFAULT 1 NOT NULL;

-- Reorder and set default to user table
ALTER TABLE user MODIFY COLUMN updated_at datetime DEFAULT CURRENT_TIMESTAMP  on update CURRENT_TIMESTAMP NOT NULL;
ALTER TABLE user CHANGE worker_id worker_id char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' NOT NULL AFTER department_id;
ALTER TABLE user CHANGE avatar_file avatar_file blob NULL AFTER avatar;

-- UPDATE COLLATES
ALTER TABLE _prisma_migrations COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE action_permission COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE announcement COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE benefit COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE job_title COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE learning_path COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE module COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE position COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE seniority COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE stack COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE user COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE user_module_permission COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE workers_refresh_dates COLLATE=utf8mb4_0900_ai_ci;