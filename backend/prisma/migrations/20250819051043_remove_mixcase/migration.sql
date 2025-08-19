/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `availability_override` table. All the data in the column will be lost.
  - You are about to drop the column `isHoliday` on the `calendar` table. All the data in the column will be lost.
  - You are about to drop the column `isWeekend` on the `calendar` table. All the data in the column will be lost.
  - Added the required column `is_available` to the `availability_override` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_holiday` to the `calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_weekend` to the `calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."availability_override" DROP COLUMN "isAvailable",
ADD COLUMN     "is_available" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "public"."calendar" DROP COLUMN "isHoliday",
DROP COLUMN "isWeekend",
ADD COLUMN     "is_holiday" BOOLEAN NOT NULL,
ADD COLUMN     "is_weekend" BOOLEAN NOT NULL;
