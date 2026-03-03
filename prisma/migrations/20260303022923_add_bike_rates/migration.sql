/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `bikes` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `rentals` table. All the data in the column will be lost.
  - You are about to alter the column `totalPrice` on the `rentals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `balance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `dailyRate` to the `bikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRate` to the `bikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyRate` to the `bikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedReturnDate` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periods` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Made the column `totalPrice` on table `rentals` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RentalPlan" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RentalStatus" ADD VALUE 'WAITING_RETURN';
ALTER TYPE "RentalStatus" ADD VALUE 'CANCELED';
ALTER TYPE "RentalStatus" ADD VALUE 'OVERDUE';

-- AlterTable
ALTER TABLE "bikes" DROP COLUMN "hourlyRate",
ADD COLUMN     "dailyRate" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "monthlyRate" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "weeklyRate" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "endDate",
ADD COLUMN     "actualReturnDate" TIMESTAMP(3),
ADD COLUMN     "expectedReturnDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periods" INTEGER NOT NULL,
ADD COLUMN     "plan" "RentalPlan" NOT NULL,
ALTER COLUMN "totalPrice" SET NOT NULL,
ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(10,2);

-- CreateTable
CREATE TABLE "company_cash" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_cash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rentals_userId_idx" ON "rentals"("userId");

-- CreateIndex
CREATE INDEX "rentals_bikeId_idx" ON "rentals"("bikeId");

-- CreateIndex
CREATE INDEX "rentals_status_idx" ON "rentals"("status");
