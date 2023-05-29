const prisma = require('../services/prisma.service');

async function getEvaluacionesData() {
  try {
    await prisma.$connect();
    const evaluaciones = await prisma.evaluacion.findMany({
      select: {
        eval_id: true,
        eval_nombre: true,
        eval_fecha_creado: true,
        eval_fecha_termino: true
      }
    });

    return { 
      evaluaciones
    }

  } catch (error) {
    console.log(error);
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener las evaluaciones');
  } finally {
    await prisma.$disconnect();
  }
}


async function getEvaluacionesActivasData() {
  try {
    await prisma.$connect();
    const evaluaciones = await prisma.evaluacion.findMany({
      where: {
        eval_activa : true
      },
      select: {
        eval_id: true,
        eval_nombre: true,
        eval_fecha_creado: true,
        eval_fecha_termino: true
      }
    });

    return { 
      evaluaciones
    }

  } catch (error) {
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener las evaluaciones');
  } finally {
    await prisma.$disconnect();
  }
}



async function getEvaluacionesByIdData(id) {
  try {
    await prisma.$connect();
    const evaluacion = await prisma.evaluacion.findUnique({
      where: {
        eval_id: id
      },
      select: {
        eval_nombre: true,
        eval_fecha_creado: true,
        eval_fecha_termino: true,
        eval_activa: true,
        grupo: {
          select: {
            grup_nombre: true
          }
        },
        prueba: {
          select: {
            prueb_nombre: true
          }
        }
      }
    });
    
    
    return evaluacion !== null ? evaluacion: false;

  } catch (error) {
    console.log(error);
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener las evaluaciones');
  } finally {
    await prisma.$disconnect();
  }
}

async function createEvaluacionData(
    eval_nombre,
    eval_fecha_creado,
    eval_fecha_termino,
    eval_instrucciones,
    prueba,
    grupo) 
{
  try {
    await prisma.$connect();
    const createdEvaluacion = await prisma.evaluacion.create({
      data: {
        eval_nombre: eval_nombre,
        eval_fecha_creado: eval_fecha_creado,
        eval_fecha_termino: eval_fecha_termino,
        eval_instrucciones: eval_instrucciones,
        prueba: { connect: { prueb_id: prueba.prueb_id } },
        grupo: { connect: { grup_id: grupo.grup_id } }
      }
    });
    return { createdEvaluacion };
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear evaluacion');
  } finally {
    await prisma.$disconnect();
  }
}



module.exports = {
  getEvaluacionesData,
  getEvaluacionesActivasData,
  getEvaluacionesByIdData,
  createEvaluacionData
};
