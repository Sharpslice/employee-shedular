/*
  Warnings:

  - You are about to drop the column `time_block_id` on the `employee_availability` table. All the data in the column will be lost.
  - Added the required column `employee_availability_id` to the `employee_availability_time_block` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."employee_availability" DROP CONSTRAINT "employee_availability_time_block_id_fkey";

-- AlterTable
ALTER TABLE "public"."employee_availability" DROP COLUMN "time_block_id";

-- AlterTable
ALTER TABLE "public"."employee_availability_time_block" ADD COLUMN     "employee_availability_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."employee_availability_time_block" ADD CONSTRAINT "employee_availability_time_block_employee_availability_id_fkey" FOREIGN KEY ("employee_availability_id") REFERENCES "public"."employee_availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
