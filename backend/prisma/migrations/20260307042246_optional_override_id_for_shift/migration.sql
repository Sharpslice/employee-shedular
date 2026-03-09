/*
  Warnings:

  - A unique constraint covering the columns `[override_id]` on the table `employee_shifts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."employee_shifts" ADD COLUMN     "override_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "employee_shifts_override_id_key" ON "public"."employee_shifts"("override_id");

-- AddForeignKey
ALTER TABLE "public"."employee_shifts" ADD CONSTRAINT "employee_shifts_override_id_fkey" FOREIGN KEY ("override_id") REFERENCES "public"."employee_time_override"("id") ON DELETE SET NULL ON UPDATE CASCADE;
