-- CreateTable
CREATE TABLE "employee_employment_history" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "employee_employment_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_employment_history_employee_id_start_date_key" ON "employee_employment_history"("employee_id", "start_date");

-- AddForeignKey
ALTER TABLE "employee_employment_history" ADD CONSTRAINT "employee_employment_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
