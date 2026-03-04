/*
  Warnings:

  - You are about to drop the column `is_available` on the `employee_time_override` table. All the data in the column will be lost.
  - Added the required column `type` to the `employee_time_override` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Override_Type" AS ENUM ('ILLNESS', 'SCHOOL', 'APPOINTMENT', 'BIRTHDAY', 'MISC');

-- AlterTable
ALTER TABLE "public"."employee_time_override" DROP COLUMN "is_available",
ADD COLUMN     "type" "public"."Override_Type" NOT NULL;
