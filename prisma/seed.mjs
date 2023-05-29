import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

const generateFakeData = () => {
  const fakeData = {};

  // Generate fake data for each model
  fakeData.usu_usuario = {
    usu_nombre: faker.name.firstName(),
    usu_apellido: faker.name.lastName(),
    usu_correo: faker.internet.email(),
    usu_hash: '1234567890',
  };

  fakeData.con_usuario_tipo = {
    usu_tipo_nombre: 'Admin',
  };

  fakeData.prueba = {
    prueb_cantidad_preguntas: 1,
    prueb_nombre: faker.random.word(),
    prueb_dificultad: 'media',
  };

  fakeData.matriz = {
    mat_enunciado: faker.lorem.sentence(),
  };

  fakeData.opcion1 = {
    opt_texto: faker.random.word(),
  };

  fakeData.opcion2 = {
    opt_texto: faker.random.word(),
  };

  fakeData.pregunta = {
    preg_texto: faker.lorem.sentence(),
    preg_tipo: 'Alternativas',
    preg_respuesta_correcta: fakeData.opcion1.opt_texto,
    preg_dificultad: 'baja',
  };

  fakeData.pregunta_opcion = {};

  fakeData.etiqueta = {
    etiq_texto: faker.lorem.word(),
  };

  fakeData.pregunta_etiqueta = {};

  fakeData.grupo = {
    grup_nombre: 'Grupo 1',
    grup_estilo_visual: faker.internet.color(),
  };

  fakeData.usu_usuario_grupo = {};

  fakeData.per_persona = {
    per_nombre: faker.name.firstName(),
    per_apellido: faker.name.lastName(),
    per_correo: faker.internet.email(),
  };

  fakeData.grupo_persona = {};

  fakeData.evaluacion = {
    eval_fecha_termino: faker.date.future(),
    eval_instrucciones: faker.lorem.paragraph(),
  };

  fakeData.usu_usuario_evaluacion = {};

  return fakeData;
};

const seedData = async () => {
  const fakeData = generateFakeData();

  const conUsuarioTipo = await prisma.con_usuario_tipo.create({
    data: fakeData.con_usuario_tipo,
  });

  const usuUsuario = await prisma.usu_usuario.create({
    data: fakeData.usu_usuario,
  });

  const usuUsuarioUsuarioTipo = await prisma.usu_usuario_usuario_tipo.create({
    data: {
      usuario_tipo: { connect: { usu_tipo_id: conUsuarioTipo.usu_tipo_id } },
      usu_usuario: { connect: { usu_id: usuUsuario.usu_id } },
    },
  });

  const prueba = await prisma.prueba.create({
    data: fakeData.prueba,
  });

  const matriz = await prisma.matriz.create({
    data: fakeData.matriz,
  });

  const pregunta = await prisma.pregunta.create({
    data: {
      ...fakeData.pregunta,
      prueba: { connect: { prueb_id: prueba.prueb_id } },
      matriz: { connect: { mat_id: matriz.mat_id } },
    },
  });


  const opcion = await prisma.opcion.create({
    data: fakeData.opcion1,
  });

  const preguntaOpcion = await prisma.pregunta_opcion.create({
    data: {
      ...fakeData.pregunta_opcion,
      pregunta: { connect: { preg_id: pregunta.preg_id } },
      opcion: { connect: { opt_id: opcion.opt_id } },
    },
  });

  const etiqueta = await prisma.etiqueta.create({
    data: fakeData.etiqueta,
  });

  const preguntaEtiqueta = await prisma.pregunta_etiqueta.create({
    data: {
      ...fakeData.pregunta_etiqueta,
      pregunta: { connect: { preg_id: pregunta.preg_id } },
      etiqueta: { connect: { etiq_id: etiqueta.etiq_id } },
    },
  });

  const grupo = await prisma.grupo.create({
    data: fakeData.grupo,
  });

  const usuUsuarioGrupo = await prisma.usu_usuario_grupo.create({
    data: {
      ...fakeData.usu_usuario_grupo,
      usuario: { connect: { usu_id: usuUsuario.usu_id } },
      grupo: { connect: { grup_id: grupo.grup_id } },
    },
  });

  const perPersona = await prisma.per_persona.create({
    data: fakeData.per_persona,
  });

  const grupoPersona = await prisma.grupo_persona.create({
    data: {
      ...fakeData.grupo_persona,
      grupo: { connect: { grup_id: grupo.grup_id } },
      persona: { connect: { per_id: perPersona.per_id } },
    },
  });

  const evaluacion = await prisma.evaluacion.create({
    data: {
      ...fakeData.evaluacion,
      prueba: { connect: { prueb_id: prueba.prueb_id } },
      grupo: { connect: { grup_id: grupo.grup_id } },
    },
  });

  const usuUsuarioEvaluacion = await prisma.usu_usuario_evaluacion.create({
    data: {
      ...fakeData.usu_usuario_evaluacion,
      usu_usuario: { connect: { usu_id: usuUsuario.usu_id } },
      evaluacion: { connect: { eval_id: evaluacion.eval_id } },
    },
  });

  console.log('Seed data created successfully!');
};

seedData()
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
