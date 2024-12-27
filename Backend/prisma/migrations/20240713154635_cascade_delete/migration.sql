-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "PostBookmarkRelation";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "UserBookmarkRelation";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "FolloweeRelation";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "FollowerRelation";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "PostAuthorRelation";

-- DropForeignKey
ALTER TABLE "TagsOnPost" DROP CONSTRAINT "TagsOnPost";

-- DropForeignKey
ALTER TABLE "TagsOnPost" DROP CONSTRAINT "TagsOnPost_postId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "PostAuthorRelation" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "FollowerRelation" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "FolloweeRelation" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "UserBookmarkRelation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "PostBookmarkRelation" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
