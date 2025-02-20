/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guest_name_key" ON "Guest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
