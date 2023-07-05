ALTER TABLE user_module_permission MODIFY COLUMN id INT UNSIGNED auto_increment NOT NULL;
ALTER TABLE user_module_permission ADD status BOOL DEFAULT 1 NOT NULL AFTER user_id;
