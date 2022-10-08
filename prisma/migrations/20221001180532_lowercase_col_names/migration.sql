/*
  Warnings:

  - You are about to drop the column `Description` on the `bucketlists` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `bucketlists` table. All the data in the column will be lost.
  - Added the required column `description` to the `bucketlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `bucketlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bucketlists" DROP COLUMN "Description",
DROP COLUMN "Title",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
