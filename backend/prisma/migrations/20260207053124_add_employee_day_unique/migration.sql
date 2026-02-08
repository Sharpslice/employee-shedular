/*
  Warnings:

  - A unique constraint covering the columns `[employee_id,day_of_week]` on the table `employee_availability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "employee_availability_employee_id_day_of_week_key" ON "public"."employee_availability"("employee_id", "day_of_week");
