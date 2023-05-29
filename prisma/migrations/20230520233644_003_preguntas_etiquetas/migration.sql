-- CreateTable
CREATE TABLE "etiqueta" (
    "etiq_id" SERIAL NOT NULL,
    "etiq_texto" TEXT NOT NULL,

    CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("etiq_id")
);

-- CreateTable
CREATE TABLE "pregunta_etiqueta" (
    "preg_etiq_id" SERIAL NOT NULL,
    "pregunta_id" INTEGER NOT NULL,
    "etiqueta_id" INTEGER NOT NULL,

    CONSTRAINT "pregunta_etiqueta_pkey" PRIMARY KEY ("preg_etiq_id")
);

-- AddForeignKey
ALTER TABLE "pregunta_etiqueta" ADD CONSTRAINT "pregunta_etiqueta_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "pregunta"("preg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregunta_etiqueta" ADD CONSTRAINT "pregunta_etiqueta_etiqueta_id_fkey" FOREIGN KEY ("etiqueta_id") REFERENCES "etiqueta"("etiq_id") ON DELETE RESTRICT ON UPDATE CASCADE;
