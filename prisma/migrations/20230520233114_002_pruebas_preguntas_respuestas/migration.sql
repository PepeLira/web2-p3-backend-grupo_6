-- CreateTable
CREATE TABLE "prueba" (
    "prueb_id" SERIAL NOT NULL,
    "prueb_cantidad_preguntas" INTEGER NOT NULL,
    "prueb_dificultad" TEXT NOT NULL,

    CONSTRAINT "prueba_pkey" PRIMARY KEY ("prueb_id")
);

-- CreateTable
CREATE TABLE "matriz" (
    "mat_id" SERIAL NOT NULL,
    "mat_enunciado" TEXT NOT NULL,

    CONSTRAINT "matriz_pkey" PRIMARY KEY ("mat_id")
);

-- CreateTable
CREATE TABLE "pregunta" (
    "preg_id" SERIAL NOT NULL,
    "preg_texto" TEXT NOT NULL,
    "preg_tipo" TEXT NOT NULL,
    "preg_respuesta_correcta" TEXT NOT NULL,
    "preg_dificultad" TEXT NOT NULL,
    "prueba_id" INTEGER NOT NULL,
    "matriz_id" INTEGER NOT NULL,

    CONSTRAINT "pregunta_pkey" PRIMARY KEY ("preg_id")
);

-- CreateTable
CREATE TABLE "pregunta_opcion" (
    "preg_op_id" SERIAL NOT NULL,
    "pregunta_id" INTEGER NOT NULL,
    "opcion_id" INTEGER NOT NULL,

    CONSTRAINT "pregunta_opcion_pkey" PRIMARY KEY ("preg_op_id")
);

-- CreateTable
CREATE TABLE "opcion" (
    "opt_id" SERIAL NOT NULL,
    "opt_texto" TEXT NOT NULL,

    CONSTRAINT "opcion_pkey" PRIMARY KEY ("opt_id")
);

-- AddForeignKey
ALTER TABLE "pregunta" ADD CONSTRAINT "pregunta_prueba_id_fkey" FOREIGN KEY ("prueba_id") REFERENCES "prueba"("prueb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregunta" ADD CONSTRAINT "pregunta_matriz_id_fkey" FOREIGN KEY ("matriz_id") REFERENCES "matriz"("mat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregunta_opcion" ADD CONSTRAINT "pregunta_opcion_pregunta_id_fkey" FOREIGN KEY ("pregunta_id") REFERENCES "pregunta"("preg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pregunta_opcion" ADD CONSTRAINT "pregunta_opcion_opcion_id_fkey" FOREIGN KEY ("opcion_id") REFERENCES "opcion"("opt_id") ON DELETE RESTRICT ON UPDATE CASCADE;
