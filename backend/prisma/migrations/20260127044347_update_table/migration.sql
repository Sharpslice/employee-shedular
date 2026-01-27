/*
  Warnings:

  - The `start_time` column on the `employee_shifts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `end_time` column on the `employee_shifts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."employee_availability_time_block" ALTER COLUMN "start_time" SET DATA TYPE TIME,
ALTER COLUMN "end_time" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "public"."employee_override_time_block" ALTER COLUMN "start_time" SET DATA TYPE TIME,
ALTER COLUMN "end_time" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "public"."employee_shifts" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIME,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIME;
