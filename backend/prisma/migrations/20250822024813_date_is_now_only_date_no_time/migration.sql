/*
  Warnings:

  - The primary key for the `calendar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/

-- Drop foreign key from employee_shifts
ALTER TABLE "public"."employee_shifts" DROP CONSTRAINT "employee_shifts_date_fkey";

-- DropForeignKey


ALTER TABLE "public"."availability_override" DROP CONSTRAINT "availability_override_date_fkey";

-- AlterTable
ALTER TABLE "public"."availability_override" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "public"."calendar" DROP CONSTRAINT "calendar_pkey",
ALTER COLUMN "date" SET DATA TYPE DATE,
ADD CONSTRAINT "calendar_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "public"."employee_availability" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AddForeignKey
ALTER TABLE "public"."availability_override" ADD CONSTRAINT "availability_override_date_fkey" FOREIGN KEY ("date") REFERENCES "public"."calendar"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
