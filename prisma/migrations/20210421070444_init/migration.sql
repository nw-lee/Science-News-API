-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "published_at" TIMESTAMP(3) NOT NULL,
    "comment_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.link_unique" ON "Post"("link");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
