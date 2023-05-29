const pruebaData = require('../data/pruebas.data');
const { OK, CREATED, BAD_REQUEST } = require('../utils/response.status');

async function getPruebas() {
  try {
    const pruebas = await pruebaData.getPruebas();
    return {status: OK, data : pruebas};
  } catch (error) {
    // Manejo de error
    console.log(error);
    throw new Error('Error al obtener las pruebas');
  }
}

async function getPruebaById (id) {
  try {
    const prueba = await pruebaData.getPruebaById(parseInt(id))
    if (prueba === false) 
      return { status : BAD_REQUEST, data :  {message : 'ID invalido'}}
    return ({status : OK, data: prueba})
  } catch (error) {
    console.log(error);
    throw new Error(' Error servicio getPruebaById')
  }
}

async function postPreguntaPruebaById(pruebaId, preguntaTexto, preguntaTipo, preguntaDificultad) {
  try {
    const prueba = await pruebaData.getPruebaById(parseInt(pruebaId));
    if (prueba == false)
      return { status : BAD_REQUEST, data :  {message : 'ID invalido'}}
    console.log(prueba, ' prueba');
    const pregunta = await pruebaData.postPregunta(prueba, preguntaTexto, preguntaTipo, preguntaDificultad);
    return ({status: CREATED, data: pregunta})
  } catch (error) {
    console.error(error); 
    throw new Error('Error creating pregunta');
  }
}


async function createPrueba(prueba_cantidad_preguntas, prueba_nombre, prueba_dificultad, prueba_usuario_id) {
  try {
    const createdPrueba = await pruebaData.createPrueba(prueba_cantidad_preguntas, prueba_nombre, prueba_dificultad, prueba_usuario_id);
    
    return { status: CREATED, data: createdPrueba };
  } catch (error) {
    // Manejo de error
    console.error(error); 
    throw new Error('Error creating prueba');
  }
}

module.exports = {
  getPruebas,
  getPruebaById,
  createPrueba,
  postPreguntaPruebaById
};
