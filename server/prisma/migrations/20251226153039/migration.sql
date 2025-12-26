/*
  Warnings:

  - You are about to drop the column `storage_URL` on the `Image` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3Key` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "storage_URL",
ADD COLUMN     "image_Url" TEXT,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "s3Key" TEXT NOT NULL,
ALTER COLUMN "size" DROP NOT NULL;
