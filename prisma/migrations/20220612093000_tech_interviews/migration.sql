/* Create candidate table */
CREATE TABLE candidate (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` TINYTEXT NOT NULL,
	`last_name` TINYTEXT NOT NULL,
	`email` TINYTEXT NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


/* Create client table */
CREATE TABLE client (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` TINYTEXT NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


/* Create opportunity table */
CREATE TABLE opportunity (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`bullhorn_id` INT UNSIGNED NOT NULL,
	`job_title_id` TINYINT UNSIGNED NOT NULL,
	`client_id` INT UNSIGNED NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE opportunity ADD CONSTRAINT opportunity_job_title_FK FOREIGN KEY (job_title_id) REFERENCES job_title(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE opportunity ADD CONSTRAINT opportunity_client_FK FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE RESTRICT ON UPDATE RESTRICT;


/* Create tech_interview table */

CREATE TABLE tech_interview (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`interview_date` DATETIME NOT NULL,
	`candidate_id` INT UNSIGNED NOT NULL,
	`opportunity_id` INT UNSIGNED NOT NULL,
	`status` BOOLEAN NOT NULL DEFAULT true,
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

	PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_opportunity_FK FOREIGN KEY (opportunity_id) REFERENCES opportunity(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_candidate_FK FOREIGN KEY (candidate_id) REFERENCES candidate(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
