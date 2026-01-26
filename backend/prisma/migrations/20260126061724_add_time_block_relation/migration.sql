-- AlterTable
ALTER TABLE "public"."employee_availability" ADD COLUMN     "time_block_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."employee_availability" ADD CONSTRAINT "employee_availability_time_block_id_fkey" FOREIGN KEY ("time_block_id") REFERENCES "public"."employee_availability_time_block"("id") ON DELETE SET NULL ON UPDATE CASCADE;
