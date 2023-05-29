var express = require('express');
var router = express.Router();

const validateId = require('../middlewares/validateId.middleware');


const test = require('../controllers/test.controller');
router.get('/', test.testApiCall);


// Router Pruebas
const pruebas = require('../controllers/pruebas.controller');
router.get('/pruebas/', pruebas.getPruebas)
router.post('/pruebas/new/', pruebas.createPrueba);
router.get('/pruebas/:id/', validateId, pruebas.getPruebaById)
router.post('/pruebas/:id/pregunta/', validateId, pruebas.postPreguntaPruebaById)
// Router Grupos
const grupos = require('../controllers/grupos.controller')
router.get('/grupos/', grupos.getGrupos)
router.get('/grupos/:id/', validateId, grupos.getGrupoById)
router.post('/grupos/new/', grupos.createGrupo);


// Router Evaluaciones
const evaluaciones = require('../controllers/evaluaciones.controller');

router.get('/evaluaciones/', evaluaciones.getEvaluaciones)
router.get('/evaluaciones/activas/', evaluaciones.getEvaluacionesActivas)
router.get('/evaluaciones/:id/', validateId, evaluaciones.getEvaluacionById)
router.post('/evaluaciones/new/', evaluaciones.createEvaluacion);

module.exports = router;