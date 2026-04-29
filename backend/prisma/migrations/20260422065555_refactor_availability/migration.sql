/*
  Warnings:

  - You are about to drop the column `note` on the `employee_time_override` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `employee_time_override` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `employee_time_override` table. All the data in the column will be lost.
  - Made the column `shift_id` on table `employee_time_override` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Availability_Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "Unavailability_Type" AS ENUM ('ILLNESS', 'SCHOOL', 'APPOINTMENT', 'BIRTHDAY', 'MISC');

-- AlterTable
ALTER TABLE "employee_time_override" DROP COLUMN "note",
DROP COLUMN "status",
DROP COLUMN "type",
ALTER COLUMN "shift_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "employee_weekly_availability" ADD COLUMN     "status" "Availability_Status" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Override_Status";

-- DropEnum
DROP TYPE "Override_Type";

-- AddForeignKey
ALTER TABLE "employee_weekly_availability" ADD CONSTRAINT "employee_weekly_availability_date_fkey" FOREIGN KEY ("date") REFERENCES "calendar"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
