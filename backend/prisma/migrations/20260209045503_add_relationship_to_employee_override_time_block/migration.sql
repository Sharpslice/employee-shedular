/*
  Warnings:

  - Added the required column `employee_time_override_id` to the `employee_override_time_block` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `start_time` on the `employee_override_time_block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `employee_override_time_block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."employee_override_time_block" ADD COLUMN     "employee_time_override_id" INTEGER NOT NULL,
DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMPTZ NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIMESTAMPTZ NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."employee_override_time_block" ADD CONSTRAINT "employee_override_time_block_employee_time_override_id_fkey" FOREIGN KEY ("employee_time_override_id") REFERENCES "public"."employee_time_override"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
