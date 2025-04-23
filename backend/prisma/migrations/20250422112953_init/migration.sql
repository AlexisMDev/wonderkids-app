/*
  Warnings:

  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `potential` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Player` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "name",
DROP COLUMN "potential",
DROP COLUMN "value",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
