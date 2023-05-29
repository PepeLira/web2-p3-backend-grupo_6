-- CreateTable
CREATE TABLE "usu_usuario" (
    "usu_id" SERIAL NOT NULL,
    "usu_nombre" TEXT NOT NULL,
    "usu_apellido" TEXT NOT NULL,
    "usu_correo" TEXT NOT NULL,

    CONSTRAINT "usu_usuario_pkey" PRIMARY KEY ("usu_id")
);

-- CreateTable
CREATE TABLE "con_usuario_tipo" (
    "usu_tipo_id" SERIAL NOT NULL,
    "usu_tipo_nombre" TEXT NOT NULL,

    CONSTRAINT "con_usuario_tipo_pkey" PRIMARY KEY ("usu_tipo_id")
);

-- CreateTable
CREATE TABLE "usu_usuario_usuario_tipo" (
    "use_user_user_type_id" SERIAL NOT NULL,
    "usuario_tipo_id" INTEGER NOT NULL,
    "usu_usuario_id" INTEGER NOT NULL,

    CONSTRAINT "usu_usuario_usuario_tipo_pkey" PRIMARY KEY ("use_user_user_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usu_usuario_usu_correo_key" ON "usu_usuario"("usu_correo");

-- CreateIndex
CREATE UNIQUE INDEX "con_usuario_tipo_usu_tipo_nombre_key" ON "con_usuario_tipo"("usu_tipo_nombre");

-- AddForeignKey
ALTER TABLE "usu_usuario_usuario_tipo" ADD CONSTRAINT "usu_usuario_usuario_tipo_usuario_tipo_id_fkey" FOREIGN KEY ("usuario_tipo_id") REFERENCES "con_usuario_tipo"("usu_tipo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usu_usuario_usuario_tipo" ADD CONSTRAINT "usu_usuario_usuario_tipo_usu_usuario_id_fkey" FOREIGN KEY ("usu_usuario_id") REFERENCES "usu_usuario"("usu_id") ON DELETE RESTRICT ON UPDATE CASCADE;
