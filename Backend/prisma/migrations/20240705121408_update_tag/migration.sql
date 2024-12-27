/*
  Warnings:

  - You are about to drop the column `tagId` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tagId";

-- RenameForeignKey
ALTER TABLE "TagsOnPost" RENAME CONSTRAINT "TagsOnPost_tagId_fkey" TO "TagsOnPost";
