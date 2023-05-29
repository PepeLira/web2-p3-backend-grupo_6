const { prueba } = require('../services/prisma.service');
const pruebasService = require('../services/pruebas.service');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../utils/response.status');

async function getPruebas(req, res) {
  try {
    const pruebas = await pruebasService.getPruebas();
    res.status(pruebas.status).json(pruebas.data);
  } catch (error) {
    // Manejo de error
    res.status(INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener las pruebas' });
  }
}

async function getPruebaById(req, res) {
  try {
    let pruebaId = req.params.id
    const prueba = await pruebasService.getPruebaById(pruebaId);
    res.status(prueba.status).json(prueba.data);
  } catch (error) {
    // Manejo de error
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener las pruebas' });
  }
}


async function postPreguntaPruebaById (req, res) {
  try {
    let pruebaId = req.params.id;
    let {preguntaText, preguntaTipo, preguntaDificultad} = req.body;
    
    const pregunta = await pruebasService.postPreguntaPruebaById(pruebaId, preguntaText, preguntaTipo, preguntaDificultad);
    res.status(pregunta.status).json(pregunta.data);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR)
  }
}



async function createPrueba(req, res) {
  console.log(req.body);
  const { prueba_cantidad_preguntas, prueba_nombre, prueba_dificultad, prueba_usuario_id } = req.body;

  try {
    const createdPrueba = await pruebasService.createPrueba(prueba_cantidad_preguntas, prueba_nombre, prueba_dificultad, prueba_usuario_id);

    // Return a success response
    res.status(200).json(createdPrueba);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Error creating prueba' });
  }
}

module.exports = {
  getPruebas,
  getPruebaById,
  postPreguntaPruebaById,
  createPrueba
};
