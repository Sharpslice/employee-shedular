/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - Made the column `googleId` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "public"."Position" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "public"."employee" ALTER COLUMN "googleId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "public"."employee"("email");
