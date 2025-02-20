/*
  Warnings:

  - You are about to drop the column `mail` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mail",
ALTER COLUMN "sites" DROP NOT NULL;
