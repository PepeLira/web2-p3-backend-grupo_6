const evaluacionesData = require('../data/evaluaciones.data');
const { OK, BAD_REQUEST } = require('../utils/response.status');
const pruebasData = require('../data/pruebas.data');
const gruposData = require('../data/grupos.data');


async function getEvaluaciones(activas = false) {
    try {
      let evaluaciones;
      if (activas) {
        evaluaciones = await evaluacionesData.getEvaluacionesActivasData();
      } else {
        evaluaciones = await evaluacionesData.getEvaluacionesData();
      }
      return { status: OK, data: evaluaciones };
    } catch (error) {
      console.log(error);
      throw new Error('Error servicio getEvaluaciones');
    }
}
  
async function getEvaluacionById(id) {
  try {
    const evaluacion = await evaluacionesData.getEvaluacionesByIdData(parseInt(id));

    if (evaluacion === false)
      return { status: BAD_REQUEST, data :  {message : 'ID invalido'}}
    return ({status: OK, data: evaluacion})
  } catch (error) {
    console.log(error);
    throw new Error('Error servicio getEvaluacionById')
  }
}

async function createEvaluacion(
    eval_nombre,
    eval_fecha_creado,
    eval_fecha_termino,
    eval_instrucciones,
    id_prueba,
    id_grupo
) {
    try {
        const prueba = await pruebasData.getPruebaById(id_prueba);
        const grupo = await gruposData.getGrupoById(id_grupo);
        if (prueba === false)
            throw new Error('ID prueba invalido');
        else if (grupo === false)
            throw new Error('ID grupo invalido');
        else{
          const createdEvaluacion = await evaluacionesData.createEvaluacionData(
              eval_nombre,
              eval_fecha_creado,
              eval_fecha_termino,
              eval_instrucciones,
              prueba,
              grupo
          );

          return createdEvaluacion;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error servicio createEvaluacion')
    }
}


module.exports = {
    getEvaluaciones,
    getEvaluacionById,
    createEvaluacion
}