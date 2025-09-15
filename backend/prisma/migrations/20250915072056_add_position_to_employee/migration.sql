-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('PHARMACIST', 'TECHNICIAN');

-- AlterTable
ALTER TABLE "public"."employee" ADD COLUMN     "position" "public"."Position";
