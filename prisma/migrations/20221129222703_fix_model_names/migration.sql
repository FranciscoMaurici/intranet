/*
  Warnings:

  - A unique constraint covering the columns `[module_id,user_id]` on the table `userModulePermission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `userModulePermission_module_id_user_id_key` ON `userModulePermission`(`module_id`, `user_id`);
