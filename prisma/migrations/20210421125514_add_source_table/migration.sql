-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "source_id" INTEGER,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source.source_unique" ON "Source"("source");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("source_id") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
