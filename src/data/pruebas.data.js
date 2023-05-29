const prisma = require('../services/prisma.service');
const { OK, CREATED } = require('../utils/response.status');

async function getPruebas() {
  try {
    await prisma.$connect();
    const pruebas = await prisma.prueba.findMany();
    return { 
      pruebas
    }

  } catch (error) {
    console.log(error);
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener las pruebas');
  } finally {
    await prisma.$disconnect();
  }
}

async function getPruebaById(id) {
  try {
    await prisma.$connect();
    const prueba = await prisma.prueba.findUnique({
      where: {
        prueb_id: id,
      },
      include: {
        pregunta: {
          include: {
            pregunta_opcion: {
              include: {
                opcion: true,
              },
            },
          },
        },
      },
    });
    

    return prueba !== null ? prueba: false; 

  } catch (error) {
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener prueba por id');
  } finally {
    await prisma.$disconnect();
  }
}

async function createPrueba(prueba_cantidad_preguntas, prueba_nombre, prueba_dificultad, prueba_usuario_id) {
  try {
    await prisma.$connect();
    
    const createdPrueba = await prisma.prueba.create({
      data: {
        prueb_cantidad_preguntas: prueba_cantidad_preguntas,
        prueb_nombre:             prueba_nombre,
        prueb_dificultad:         prueba_dificultad,
        prueb_usuario_id:         prueba_usuario_id,
      }
    });
    
    return { createdPrueba };
  } catch (error) {
    console.error(error);
    throw new Error('Error creating prueba');
  } finally {
    await prisma.$disconnect();
  }
}




async function postPregunta(prueba, preguntaTexto, preguntaTipo, preguntaDificultad) {
  try {
    await prisma.$connect

    const pregunta = await prisma.pregunta.create({
      data : {
        preg_texto: preguntaTexto,
        preg_dificultad: preguntaDificultad,
        preg_tipo: preguntaTipo,
        prueba_id: prueba.prueb_id
      }
    })

    return { pregunta };

  } catch (error) {
    console.error(error);
    throw new Error('Error creating pregunta');
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getPruebas,
  getPruebaById,
  createPrueba,
  postPregunta
};