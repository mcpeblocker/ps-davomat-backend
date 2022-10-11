/*
  Warnings:

  - You are about to drop the column `confirmed` on the `Participation` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participation" DROP COLUMN "confirmed",
ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
