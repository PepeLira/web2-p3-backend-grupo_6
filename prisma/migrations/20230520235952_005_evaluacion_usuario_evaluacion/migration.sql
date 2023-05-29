-- CreateTable
CREATE TABLE "evaluacion" (
    "eval_id" SERIAL NOT NULL,
    "eval_fecha_creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eval_fecha_termino" TIMESTAMP(3) NOT NULL,
    "eval_instrucciones" TEXT NOT NULL,
    "eval_activa" BOOLEAN NOT NULL DEFAULT true,
    "prueba_id" INTEGER NOT NULL,
    "grupo_id" INTEGER NOT NULL,

    CONSTRAINT "evaluacion_pkey" PRIMARY KEY ("eval_id")
);

-- CreateTable
CREATE TABLE "usu_usuario_evaluacion" (
    "usu_eval_id" SERIAL NOT NULL,
    "usu_usuario_id" INTEGER NOT NULL,
    "evaluacion_id" INTEGER NOT NULL,

    CONSTRAINT "usu_usuario_evaluacion_pkey" PRIMARY KEY ("usu_eval_id")
);

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_prueba_id_fkey" FOREIGN KEY ("prueba_id") REFERENCES "prueba"("prueb_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupo"("grup_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usu_usuario_evaluacion" ADD CONSTRAINT "usu_usuario_evaluacion_usu_usuario_id_fkey" FOREIGN KEY ("usu_usuario_id") REFERENCES "usu_usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usu_usuario_evaluacion" ADD CONSTRAINT "usu_usuario_evaluacion_evaluacion_id_fkey" FOREIGN KEY ("evaluacion_id") REFERENCES "evaluacion"("eval_id") ON DELETE RESTRICT ON UPDATE CASCADE;
