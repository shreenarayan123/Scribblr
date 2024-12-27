/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UniqueTags" ON "Tag"("topic");
