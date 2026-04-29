/*
  Warnings:

  - You are about to drop the `employee_override_time_block` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee_override_time_block" DROP CONSTRAINT "employee_override_time_block_employee_time_override_id_fkey";

-- DropTable
DROP TABLE "employee_override_time_block";
