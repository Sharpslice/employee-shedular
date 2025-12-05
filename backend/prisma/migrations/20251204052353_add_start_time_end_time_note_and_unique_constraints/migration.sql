/*
  Warnings:

  - A unique constraint covering the columns `[employee_id,date]` on the table `availability_override` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."availability_override" ADD COLUMN     "end_time" TIMESTAMP(3),
ADD COLUMN     "note" TEXT,
ADD COLUMN     "start_time" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "availability_override_employee_id_date_key" ON "public"."availability_override"("employee_id", "date");
