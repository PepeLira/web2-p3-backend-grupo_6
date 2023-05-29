-- DropForeignKey
ALTER TABLE "pregunta" DROP CONSTRAINT "pregunta_matriz_id_fkey";

-- AlterTable
ALTER TABLE "pregunta" ALTER COLUMN "matriz_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pregunta" ADD CONSTRAINT "pregunta_matriz_id_fkey" FOREIGN KEY ("matriz_id") REFERENCES "matriz"("mat_id") ON DELETE SET NULL ON UPDATE CASCADE;
