/*
  Warnings:

  - A unique constraint covering the columns `[tagId,postId]` on the table `TagsOnPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UniqueTagsOnPost" ON "TagsOnPost"("tagId", "postId");
