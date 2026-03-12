-- DropForeignKey
ALTER TABLE "public"."employee_override_time_block" DROP CONSTRAINT "employee_override_time_block_employee_time_override_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."employee_override_time_block" ADD CONSTRAINT "employee_override_time_block_employee_time_override_id_fkey" FOREIGN KEY ("employee_time_override_id") REFERENCES "public"."employee_time_override"("id") ON DELETE CASCADE ON UPDATE CASCADE;
