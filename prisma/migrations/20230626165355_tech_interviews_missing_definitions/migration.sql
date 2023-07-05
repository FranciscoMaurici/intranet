-- Add two missing columns for Tech Interview table
ALTER TABLE tech_interview ADD stack_manager_id INT UNSIGNED NULL AFTER interviewer_id;
ALTER TABLE tech_interview ADD is_approved BOOL NULL AFTER stack_manager_id;

-- Add FK for tech_inteview.stack_manager_id = user.id
ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_stack_manager_id_FK FOREIGN KEY (stack_manager_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Add default values to Tech Interview tables
ALTER TABLE tech_interview MODIFY COLUMN comments varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' NOT NULL;
ALTER TABLE candidate MODIFY COLUMN english_level varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' NOT NULL;
ALTER TABLE position_skill MODIFY COLUMN name varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' NOT NULL;
ALTER TABLE position_skill MODIFY COLUMN is_tech_lead tinyint(1) DEFAULT 0 NOT NULL;
ALTER TABLE `position` MODIFY COLUMN title varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' NOT NULL;

-- Add default values for text columns
ALTER TABLE candidate MODIFY COLUMN screening_feedback text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT ('') NOT NULL;
ALTER TABLE `position` MODIFY COLUMN job_description text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT ('') NOT NULL;
ALTER TABLE `position` MODIFY COLUMN requirements text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT ('') NOT NULL;
