/*
  Warnings:

  - Added the required column `usu_hash` to the `usu_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usu_usuario" ADD COLUMN     "usu_hash" TEXT NOT NULL;
