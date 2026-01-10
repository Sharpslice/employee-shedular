/*
  Warnings:

  - You are about to drop the column `date` on the `employee_availability` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `employee_availability` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `employee_availability` table. All the data in the column will be lost.
  - You are about to drop the `availability_override` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `day_of_week` to the `employee_availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_available` to the `employee_availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."availability_override" DROP CONSTRAINT "availability_override_date_fkey";

-- DropForeignKey
ALTER TABLE "public"."availability_override" DROP CONSTRAINT "availability_override_employee_id_fkey";

-- AlterTable
ALTER TABLE "public"."employee_availability" DROP COLUMN "date",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "day_of_week" INTEGER NOT NULL,
ADD COLUMN     "is_available" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "public"."availability_override";

-- CreateTable
CREATE TABLE "public"."employee_availability_time_block" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_availability_time_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_time_override" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "note" TEXT,

    CONSTRAINT "employee_time_override_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_override_time_block" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_override_time_block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_time_override_employee_id_date_key" ON "public"."employee_time_override"("employee_id", "date");

-- AddForeignKey
ALTER TABLE "public"."employee_time_override" ADD CONSTRAINT "employee_time_override_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_time_override" ADD CONSTRAINT "employee_time_override_date_fkey" FOREIGN KEY ("date") REFERENCES "public"."calendar"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
