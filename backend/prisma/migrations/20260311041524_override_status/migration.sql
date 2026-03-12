/*
  Warnings:

  - Added the required column `status` to the `employee_time_override` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Override_Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- AlterTable
ALTER TABLE "public"."employee_time_override" ADD COLUMN     "status" "public"."Override_Status" NOT NULL;
