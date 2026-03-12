/*
  Warnings:

  - You are about to drop the column `override_id` on the `employee_shifts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shift_id]` on the table `employee_time_override` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."employee_shifts" DROP CONSTRAINT "employee_shifts_override_id_fkey";

-- DropIndex
DROP INDEX "public"."employee_shifts_override_id_key";

-- AlterTable
ALTER TABLE "public"."employee_shifts" DROP COLUMN "override_id";

-- AlterTable
ALTER TABLE "public"."employee_time_override" ADD COLUMN     "shift_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "employee_time_override_shift_id_key" ON "public"."employee_time_override"("shift_id");

-- AddForeignKey
ALTER TABLE "public"."employee_time_override" ADD CONSTRAINT "employee_time_override_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."employee_shifts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
