
-- Update the Constraint for permissions. It should restrict for module_id, action_permission_id and user_id combination.
ALTER TABLE user_module_permission DROP KEY user_module_permission_module_id_user_id_key;
ALTER TABLE user_module_permission ADD CONSTRAINT user_module_permission_module_id_action_id_user_id_key UNIQUE KEY (module_id,action_permission_id,user_id);


-- Delete unnecesary columns
ALTER TABLE handbook DROP COLUMN menu_label;
ALTER TABLE handbook DROP COLUMN head_title;
ALTER TABLE handbook DROP COLUMN h1_title;
ALTER TABLE handbook DROP COLUMN subtitle;
ALTER TABLE handbook DROP COLUMN is_external;
ALTER TABLE handbook DROP COLUMN external_url;
ALTER TABLE handbook DROP COLUMN weight;


-- Prepare data to remove null values
UPDATE handbook SET is_article = 0 WHERE is_article IS NULL;


-- Optimize column types
ALTER TABLE handbook MODIFY COLUMN `order` tinyint unsigned NULL;
ALTER TABLE handbook MODIFY COLUMN title VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;
ALTER TABLE handbook MODIFY COLUMN menu_index VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL;
ALTER TABLE handbook MODIFY COLUMN `level` TINYINT UNSIGNED NULL;
ALTER TABLE handbook MODIFY COLUMN slug varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;
ALTER TABLE handbook MODIFY COLUMN is_article tinyint(1) NOT NULL;


-- Rename columns to match form names
ALTER TABLE handbook CHANGE is_article is_full_article tinyint(1) NOT NULL;
ALTER TABLE handbook CHANGE short_description homepage_text text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL;
ALTER TABLE handbook CHANGE content full_article_content text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL;


-- Reorder fields
ALTER TABLE handbook CHANGE updated_at updated_at datetime DEFAULT CURRENT_TIMESTAMP  on update CURRENT_TIMESTAMP NOT NULL AFTER `level`;
ALTER TABLE handbook CHANGE created_at created_at datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL AFTER `level`;
ALTER TABLE handbook CHANGE status status tinyint(1) DEFAULT 1 NOT NULL AFTER `level`;
ALTER TABLE handbook CHANGE slug slug varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL AFTER title;
ALTER TABLE handbook CHANGE parent_id parent_id smallint unsigned NULL AFTER slug;
ALTER TABLE handbook CHANGE `level` `level` tinyint NULL AFTER parent_id;
ALTER TABLE handbook CHANGE menu_index menu_index varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL AFTER `order`;


-- Create new column
ALTER TABLE handbook ADD use_title_on_homepage BOOL NOT NULL;
ALTER TABLE handbook CHANGE use_title_on_homepage use_title_on_homepage BOOL NOT NULL AFTER is_full_article;


-- Add unique slug constraint
ALTER TABLE handbook ADD CONSTRAINT handbook_slug_UN UNIQUE KEY (slug);
