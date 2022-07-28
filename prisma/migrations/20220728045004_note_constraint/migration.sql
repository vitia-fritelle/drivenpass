/*
  Warnings:

  - You are about to alter the column `title` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `content` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(1000);
