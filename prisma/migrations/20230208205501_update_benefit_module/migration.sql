-- AlterTable
ALTER TABLE `announcement` MODIFY `content` TEXT NOT NULL;
UPDATE module SET path = '/benefits' WHERE id = 2;