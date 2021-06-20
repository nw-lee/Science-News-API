/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_comment_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "post_id" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "comment_id";

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
