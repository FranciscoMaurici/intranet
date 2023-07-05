/* Delete title, description and image columns */
ALTER TABLE announcement DROP COLUMN title;
ALTER TABLE announcement DROP COLUMN description;
ALTER TABLE announcement DROP COLUMN image;

/* Create new column of type INT called "user_id_new" */
ALTER TABLE announcement ADD user_id_new INT NULL;

/* Create Foreign key pointing to new table */
ALTER TABLE `announcement` ADD CONSTRAINT `announcement_user_id_FK` FOREIGN KEY (`user_id_new`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/* Create SQL script to populate the new table */
update announcement a inner join user u on a.user_id = u.email set a.user_id_new =u.id;

/* Delete old "user_id" table */
ALTER TABLE announcement DROP FOREIGN KEY users_email_FK;
ALTER TABLE announcement DROP COLUMN user_id;

/* Update "user_id_new" table name */
ALTER TABLE announcement CHANGE user_id_new user_id int NULL;

/* Move new table after "id" column */
ALTER TABLE announcement CHANGE user_id user_id int NULL AFTER id;

/* Create last_updated_by_new table  */
ALTER TABLE announcement ADD last_updated_by_new INT NULL;

/* Create SQL script to populate the new table */
UPDATE announcement a INNER JOIN user u ON a.last_updated_by = u.email SET a.last_updated_by_new =u.id;

/* Delete old "last_updated_by" table */
ALTER TABLE announcement DROP COLUMN last_updated_by;

/* Update "last_updated_by_new" table name  */
ALTER TABLE announcement CHANGE last_updated_by_new last_updated_by int NULL;

/* Move new table after "content" column */
ALTER TABLE announcement CHANGE last_updated_by last_updated_by int NULL AFTER user_id;
ALTER TABLE announcement ADD CONSTRAINT announcement_last_updated_by_FK FOREIGN KEY (last_updated_by) REFERENCES `user`(id) ON DELETE RESTRICT ON UPDATE CASCADE;

/* Create a status boolean new column */
ALTER TABLE announcement ADD status BOOL DEFAULT 1 NOT NULL AFTER content;

/* copy the information from the is_active to the status column*/
UPDATE announcement SET status = 1 WHERE is_active = 'active';
UPDATE announcement SET status = 0 WHERE is_active = 'inactive';

/* Remove is_active column  */
ALTER TABLE announcement DROP COLUMN is_active;
