/*
  Warnings:

  - Added the required column `classId` to the `Extra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "classId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
