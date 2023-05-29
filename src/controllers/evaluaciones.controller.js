const e = require('cors');
const evaluacionesService = require('../services/evaluaciones.service');
const { evaluacion } = require('../services/prisma.service');
const { INTERNAL_SERVER_ERROR } = require('../utils/response.status');





const getEvaluaciones = async (req, res) => {
    try {
        const evaluaciones = await evaluacionesService.getEvaluaciones();
        res.status(evaluaciones.status).json(evaluaciones.data);
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error : 'Error interno'})
    }
}

const getEvaluacionesActivas = async (req, res) => {
    try {
        const evaluaciones = await evaluacionesService.getEvaluaciones(true);
        res.status(evaluaciones.status).json(evaluaciones.data);
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error : 'Error interno'})
    }
}


const getEvaluacionById = async ( req, res) => {
    try {
        let evaluacionId = req.params.id;
        const evaluacion = await evaluacionesService.getEvaluacionById(evaluacionId);

        res.status(evaluacion.status).json(evaluacion.data)
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error : 'Error interno'})
    }
}

const createEvaluacion = async (req, res) => {
    const {
        eval_nombre, 
        eval_fecha_creado, 
        eval_fecha_termino, 
        eval_instrucciones, 
        id_prueba, 
        id_grupo 
    } = req.body;

    try {
        const createdEvaluacion = await evaluacionesService.createEvaluacion(
            eval_nombre,
            eval_fecha_creado,
            eval_fecha_termino,
            eval_instrucciones,
            id_prueba,
            id_grupo
        );

        res.status(200).json(createdEvaluacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating evaluacion' });
    }
}

module.exports = {
    getEvaluaciones,
    getEvaluacionesActivas,
    getEvaluacionById,
    createEvaluacion
}
