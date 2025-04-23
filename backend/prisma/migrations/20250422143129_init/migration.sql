/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Player` table. All the data in the column will be lost.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "overall" INTEGER NOT NULL,
ADD COLUMN     "potential" INTEGER NOT NULL;
