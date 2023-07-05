
-- Rename in order to use "position" name for a more generic entity
RENAME TABLE `position` TO position_open;

-- Dictionary table of skills required in a position with a client
CREATE TABLE skill (
	id SMALLINT UNSIGNED auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	stack_id TINYINT UNSIGNED NULL,
  status BOOL DEFAULT true NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	
	PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT="Dictionary table of skills required in a position with a client";

-- Add FK skill.stack_id with stack.id
ALTER TABLE skill ADD CONSTRAINT skill_stack_id_FK FOREIGN KEY (stack_id) REFERENCES stack(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



-- Relational table to assign primary/secondary skills with seniority to a position
CREATE TABLE `position_skill` (
	id INT UNSIGNED auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	primary_skill_id SMALLINT UNSIGNED NOT NULL,
	primary_skill_seniority_id TINYINT UNSIGNED NOT NULL,
	secondary_skill_id SMALLINT UNSIGNED NULL,
	secondary_skill_seniority_id TINYINT UNSIGNED NULL,
	is_tech_lead BOOL NOT NULL,
	status BOOL DEFAULT true NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	
	PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT="Relational table to assign primary/secondary skills with seniority to a position";

-- Add FK position_skill.primary_skill_id with skill.id and position_skill.primary_skill_seniority_id with seniority.id 
ALTER TABLE `position_skill` ADD CONSTRAINT position_skill_primary_skill_FK FOREIGN KEY (primary_skill_id) REFERENCES skill(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `position_skill` ADD CONSTRAINT position_skill_primary_skill_seniority_FK FOREIGN KEY (primary_skill_seniority_id) REFERENCES seniority(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- Add FK position_skill.secondary_skill_id with skill.id and position_skill.secondary_skill_seniority_id with seniority.id 
ALTER TABLE `position_skill` ADD CONSTRAINT position_skill_secondary_skill_FK FOREIGN KEY (secondary_skill_id) REFERENCES skill(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `position_skill` ADD CONSTRAINT position_skill_secondary_skill_seniority_FK FOREIGN KEY (secondary_skill_seniority_id) REFERENCES seniority(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



/* Create new position table */
-- Table to assign primary/secondary skills, client and job description to a position
CREATE TABLE position (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`bullhorn_id` INT UNSIGNED NOT NULL,
	`position_skill_id` INT UNSIGNED NOT NULL,
	`client_id` INT UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `job_description` TEXT NOT NULL,
  `requirements` TEXT NOT NULL,
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT="Table to assign primary/secondary skills with seniority, client and job description to a position";

-- Add FK position.position_skill_id with position_skill.id
ALTER TABLE `position` ADD CONSTRAINT position_position_skill_FK FOREIGN KEY (position_skill_id) REFERENCES position_skill(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- Add FK position.client_id with client.id
ALTER TABLE `position` ADD CONSTRAINT position_client_FK FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



-- Drop Opportunity and replace with the new position table
ALTER TABLE tech_interview DROP FOREIGN KEY tech_interview_opportunity_FK;
DROP TABLE opportunity;

ALTER TABLE tech_interview CHANGE opportunity_id position_id int unsigned NOT NULL;
ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_position_FK FOREIGN KEY (position_id) REFERENCES `position`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



/* Create candidate_attachment table */
CREATE TABLE candidate_attachment (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`candidate_id` INT UNSIGNED NOT NULL,
  `url` varchar(100) NOT NULL,
  `type` ENUM('cv', 'coderbyte', 'other'),
  `status` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT="Table to store link to the CVs files and Codebyte links";

ALTER TABLE candidate_attachment ADD CONSTRAINT candidate_attachment_candidate_FK FOREIGN KEY (candidate_id) REFERENCES `candidate`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



/* Create country table */
CREATE TABLE country (
	`id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` varchar(60) NOT NULL,
  `alpha2` char(2) NOT NULL COMMENT "ISO 3166-1 alpha-2 code",
  `alpha3` char(3) NOT NULL COMMENT "ISO 3166-1 alpha-3 code",

  PRIMARY KEY (`id`)
)
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci
COMMENT="Dictionary table of Countries in ISO-3166";

-- Add UNIQUE constraint to country codes
ALTER TABLE country ADD CONSTRAINT country_alpha2_UN UNIQUE KEY (alpha2);
ALTER TABLE country ADD CONSTRAINT country_alpha3_UN UNIQUE KEY (alpha3);


-- Add fields to candidate table
ALTER TABLE candidate ADD country_id TINYINT UNSIGNED NOT NULL AFTER email;
ALTER TABLE candidate ADD english_level varchar(100) NOT NULL AFTER country_id;
ALTER TABLE candidate ADD screening_feedback TEXT NOT NULL AFTER english_level;
-- Add FK candidate.country_id with country.id
ALTER TABLE candidate ADD CONSTRAINT candidate_country_id_FK FOREIGN KEY (country_id) REFERENCES `country`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;



-- Add fields to tech_interview table
ALTER TABLE tech_interview ADD recruiter_id INT UNSIGNED NOT NULL AFTER interview_date;
ALTER TABLE tech_interview ADD interviewer_id INT UNSIGNED NULL AFTER position_id;
ALTER TABLE tech_interview ADD comments VARCHAR(255) NOT NULL AFTER interviewer_id;
ALTER TABLE tech_interview MODIFY COLUMN interview_date datetime NULL; -- Allow NULL for interviews without date



-- Remove announcement FK and update user.id reference
ALTER TABLE announcement DROP FOREIGN KEY announcement_last_updated_by_FK;
ALTER TABLE announcement MODIFY COLUMN last_updated_by INT UNSIGNED NOT NULL;
-- Remove announcement FK and update user.id reference
ALTER TABLE announcement DROP FOREIGN KEY announcement_user_id_FK;
ALTER TABLE announcement MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
-- Remove reaction_comment FK and update user.id reference
ALTER TABLE reaction_comment DROP FOREIGN KEY reaction_comment_user_FK;
ALTER TABLE reaction_comment MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
-- Remove reaction_announcement FK and update user.id reference
ALTER TABLE reaction_announcement DROP FOREIGN KEY reaction_announcement_user_FK;
ALTER TABLE reaction_announcement MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
-- Remove workers_update_dates FK and update user.id reference
ALTER TABLE workers_update_dates DROP FOREIGN KEY fk_workers_update_dates_executed_by;
ALTER TABLE workers_update_dates MODIFY COLUMN executed_by INT UNSIGNED NOT NULL;
-- Remove comment FK and update user.id reference
ALTER TABLE comment DROP FOREIGN KEY comment_user_FK;
ALTER TABLE comment MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
-- Remove user_module_permission FK and update user.id reference
ALTER TABLE user_module_permission DROP FOREIGN KEY user_module_permission_user_FK;
ALTER TABLE user_module_permission MODIFY COLUMN user_id INT UNSIGNED NOT NULL;

--
-- UPDATE user.id type to UNSIGNED INT 
--
ALTER TABLE user MODIFY COLUMN id INT UNSIGNED auto_increment NOT NULL;

-- Create again Foreign Keys, now with user.id as UNSIGNED INT
ALTER TABLE announcement ADD CONSTRAINT announcement_last_updated_by_FK FOREIGN KEY (last_updated_by) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE announcement ADD CONSTRAINT announcement_user_id_FK FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE reaction_comment ADD CONSTRAINT reaction_comment_user_id_FK FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE reaction_announcement ADD CONSTRAINT reaction_announcement_user_id_FK FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE workers_update_dates ADD CONSTRAINT workers_update_date_executed_by_FK FOREIGN KEY (executed_by) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE comment ADD CONSTRAINT comment_user_id_FK FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE user_module_permission ADD CONSTRAINT user_module_permission_user_id_FK FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- Add two new Foreign Keys
ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_recruiter_id_FK FOREIGN KEY (recruiter_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE tech_interview ADD CONSTRAINT tech_interview_interviewer_id_FK FOREIGN KEY (interviewer_id) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE RESTRICT;


/*
* Fill country, skill and client tables
*/

INSERT INTO country (name, alpha2, alpha3) VALUES
  ('México', 'MX', 'MEX'), ('Argentina', 'AR', 'ARG'), ('Uruguay', 'UY', 'URY'),
  ('Colombia', 'CO', 'COL'), ('Perú', 'PE', 'PER'), ('United States', 'US', 'USA');

INSERT INTO skill (name) VALUES
  ('.Net'),('Angular'),('Business Analysis'),('C#'),('C# (Auto QA)'),('C++'),('Delphi'),
  ('DevOps'),('Django'),('Ember.js'),('Erlang'),('Java (Android)'),('Java (Auto QA)'),
  ('Java (Backend)'),('JavaScript'),('JavaScript (Auto QA)'),('Kernel'),('Kotlin'),
  ('Manual QA (Mobile)'),('Manual QA (Web)'),('Node.js'),('Objective-C'),('PHP'),
  ('Product mngmnt'),('Project mngmnt'),('Python (Auto QA)'),('Python (Backend)'),
  ('Python (Data Eng)'),('React Native'),('React.js'),('Ruby on Rails'),('Scala'),
  ('SQL (Data Analyst)'),('Swift'),('UX/UI'),('Vue.js'),('WordPress'),('Xamarin');

INSERT INTO client (name) VALUES 
  ('Ally GPO'),('Altruist'),('Art Blocks.io'),('Ben Soleimani'),('BloomScape'),
  ('Branch.io'),('Brandwood Global'),('BrandYourself'),('Bridge Doc, Inc'),('Carvana'),
  ('Clear to Go'),('ClearCover'),('CNB'),('ConvexLabs'),('Cruisebound'),('Datacor'),
  ('Dollar Shave Club'),('eBay'),('Earnin'),('Edwards Technologies'),('Exactuals'),
  ('FabFitFun'),('FerroMex'),('FilmTrack'),('Healthy Engage'),('HomeBase'),
  ('HUB International Limited'),('iBank'),('iCapital'),('Insight2Profit'),('Insugrid'),
  ('InVenture Capital Corporation'),('Jump Platforms'),('JusticeHQ'),('MapDesign'),
  ('Milk Stork'),('ModuleQ'),('Naranja'),('PayQuicker'),('People Caddie'),
  ('Prosperity Life Group'),('Qu3st'),('Rabbit'),('RedBull'),('Reimagined Consulting'),
  ('RepairSmith'),('Rocket Travel, Inc.'),('Rocketmiles'),('Scorpion'),('ShipNetwork'),
  ('Speed Commerce, Inc.'),('Square 6'),('Tala'),('TapCart'),('Tarjeta Naranja'),
  ('Task Human'),('The Working Name'),('Thrive Market'),('TrueCar, Inc.'),('UATP'),
  ('United Language Group'),('Universal Air Travel Plan Inc.'),('UpLabs'),('Vasion'),
  ('VIA Customers'),('VivoAquatics'),('WellTraveled'),('Wicked Bionic LLC'),('YML Group');


