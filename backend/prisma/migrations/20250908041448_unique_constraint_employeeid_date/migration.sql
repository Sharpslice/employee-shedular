/*
  Warnings:

  - A unique constraint covering the columns `[employee_id,date]` on the table `employee_shifts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "employee_shifts_employee_id_date_key" ON "public"."employee_shifts"("employee_id", "date");
