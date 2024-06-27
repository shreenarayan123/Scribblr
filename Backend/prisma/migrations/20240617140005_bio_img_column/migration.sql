-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT DEFAULT 'An anonymous user | author',
ADD COLUMN     "img" TEXT;

-- RenameForeignKey
ALTER TABLE "Post" RENAME CONSTRAINT "Post_authorId_fkey" TO "PostAuthorRelation";
