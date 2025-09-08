-- AlterTable
ALTER TABLE "public"."employee_shifts" ALTER COLUMN "start_time" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL;
