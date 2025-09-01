-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."employee" (
    "id" SERIAL NOT NULL,
    "googleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "color" TEXT,
    "isWorking" BOOLEAN NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_shifts" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,

    CONSTRAINT "employee_shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_availability" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."availability_override" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "is_available" BOOLEAN NOT NULL,

    CONSTRAINT "availability_override_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."calendar" (
    "date" DATE NOT NULL,
    "day_of_month" INTEGER NOT NULL,
    "days_of_week" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "is_weekend" BOOLEAN NOT NULL,
    "is_holiday" BOOLEAN NOT NULL,
    "holiday_name" TEXT,

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("date")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_googleId_key" ON "public"."employee"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "public"."employee"("email");

-- AddForeignKey
ALTER TABLE "public"."employee_shifts" ADD CONSTRAINT "employee_shifts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_shifts" ADD CONSTRAINT "employee_shifts_date_fkey" FOREIGN KEY ("date") REFERENCES "public"."calendar"("date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_availability" ADD CONSTRAINT "employee_availability_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."availability_override" ADD CONSTRAINT "availability_override_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."availability_override" ADD CONSTRAINT "availability_override_date_fkey" FOREIGN KEY ("date") REFERENCES "public"."calendar"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
