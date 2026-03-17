-- AlterEnum
ALTER TYPE "StatusType" ADD VALUE 'deleted';

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'pending';
