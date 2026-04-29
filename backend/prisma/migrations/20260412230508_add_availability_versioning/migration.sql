/*
  Warnings:

  - A unique constraint covering the columns `[employee_id,day_of_week,effective_from]` on the table `employee_availability` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "employee_availability_employee_id_day_of_week_key";

-- AlterTable
ALTER TABLE "employee_availability" ADD COLUMN     "effective_from" TIMESTAMPTZ NOT NULL DEFAULT '2026-02-02'::date;

-- CreateIndex
CREATE UNIQUE INDEX "employee_availability_employee_id_day_of_week_effective_fro_key" ON "employee_availability"("employee_id", "day_of_week", "effective_from");
