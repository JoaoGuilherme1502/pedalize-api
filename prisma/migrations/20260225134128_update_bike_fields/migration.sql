/*
  Warnings:

  - You are about to alter the column `hourlyRate` on the `bikes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `year` to the `bikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bikes" ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "hourlyRate" SET DATA TYPE DOUBLE PRECISION;
