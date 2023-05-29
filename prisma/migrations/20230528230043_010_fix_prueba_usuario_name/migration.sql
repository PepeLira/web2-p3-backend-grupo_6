/*
  Warnings:

  - You are about to drop the column `prueba_usuario_id` on the `prueba` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prueba" DROP COLUMN "prueba_usuario_id",
ADD COLUMN     "prueb_usuario_id" INTEGER;
