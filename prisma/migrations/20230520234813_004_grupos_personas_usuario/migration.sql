/*
  Warnings:

  - The primary key for the `usu_usuario_usuario_tipo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `use_user_user_type_id` on the `usu_usuario_usuario_tipo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usu_usuario_usuario_tipo" DROP CONSTRAINT "usu_usuario_usuario_tipo_pkey",
DROP COLUMN "use_user_user_type_id",
ADD COLUMN     "us_usu_usu_tipo_id" SERIAL NOT NULL,
ADD CONSTRAINT "usu_usuario_usuario_tipo_pkey" PRIMARY KEY ("us_usu_usu_tipo_id");

-- CreateTable
CREATE TABLE "grupo" (
    "grup_id" SERIAL NOT NULL,
    "grup_nombre" TEXT NOT NULL,
    "grup_estilo_visual" TEXT NOT NULL,

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("grup_id")
);

-- CreateTable
CREATE TABLE "usu_usuario_grupo" (
    "usu_usuario_grupo_id" SERIAL NOT NULL,
    "usu_usuario_id" INTEGER NOT NULL,
    "grupo_id" INTEGER NOT NULL,

    CONSTRAINT "usu_usuario_grupo_pkey" PRIMARY KEY ("usu_usuario_grupo_id")
);

-- CreateTable
CREATE TABLE "per_persona" (
    "per_id" SERIAL NOT NULL,
    "per_nombre" TEXT NOT NULL,
    "per_apellido" TEXT NOT NULL,
    "per_correo" TEXT NOT NULL,

    CONSTRAINT "per_persona_pkey" PRIMARY KEY ("per_id")
);

-- CreateTable
CREATE TABLE "grupo_persona" (
    "grup_per_id" SERIAL NOT NULL,
    "grupo_id" INTEGER NOT NULL,
    "persona_id" INTEGER NOT NULL,

    CONSTRAINT "grupo_persona_pkey" PRIMARY KEY ("grup_per_id")
);

-- AddForeignKey
ALTER TABLE "usu_usuario_grupo" ADD CONSTRAINT "usu_usuario_grupo_usu_usuario_id_fkey" FOREIGN KEY ("usu_usuario_id") REFERENCES "usu_usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usu_usuario_grupo" ADD CONSTRAINT "usu_usuario_grupo_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupo"("grup_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_persona" ADD CONSTRAINT "grupo_persona_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupo"("grup_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_persona" ADD CONSTRAINT "grupo_persona_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "per_persona"("per_id") ON DELETE RESTRICT ON UPDATE CASCADE;
