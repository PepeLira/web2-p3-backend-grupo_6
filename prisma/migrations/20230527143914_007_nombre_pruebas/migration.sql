/*
  Warnings:

  - Added the required column `prueb_nombre` to the `prueba` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prueba" ADD COLUMN     "prueb_nombre" TEXT NOT NULL;
