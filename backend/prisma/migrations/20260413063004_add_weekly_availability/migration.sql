-- CreateTable
CREATE TABLE "employee_weekly_availability" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "is_available" BOOLEAN NOT NULL,

    CONSTRAINT "employee_weekly_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_weekly_availability_time_block" (
    "id" SERIAL NOT NULL,
    "employee_weekly_availability_id" INTEGER NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "employee_weekly_availability_time_block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_weekly_availability_employee_id_date_key" ON "employee_weekly_availability"("employee_id", "date");

-- AddForeignKey
ALTER TABLE "employee_weekly_availability" ADD CONSTRAINT "employee_weekly_availability_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_weekly_availability_time_block" ADD CONSTRAINT "employee_weekly_availability_time_block_employee_weekly_av_fkey" FOREIGN KEY ("employee_weekly_availability_id") REFERENCES "employee_weekly_availability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
