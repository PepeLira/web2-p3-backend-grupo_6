# API Documentation

A collection of routers for handling GET and POST requests in the API.

## Test

- `GET /api/`
  - Description: Perform a test API call.
  - Controller: `test.testApiCall`

## Pruebas

- `GET /api/pruebas/`
  - Description: Get all pruebas.
  - Controller: `pruebas.getPruebas`

- `POST /api/pruebas/new/`
  - Description: Create a new prueba.
  - Controller: `pruebas.createPrueba`
  - Parameters:
    - `prueba_cantidad_preguntas` (body): Number of "preguntas" that a "prueba" will have.
    - `prueba_nombre` (body): Name of the "prueba".
    - `prueba_dificultad` (body): Difficulty of the "prueba" such as: media/baja or alta".
    - `prueba_usuario_id` (body): User ID that is creating the "prueba".

- `GET /api/pruebas/:id/`
  - Description: Get a prueba by ID.
  - Parameters:
    - `id` (Path): ID of the prueba.
  - Middlewares:
    - `validateId`: Validate that the ID is a valid number.
  - Controller: `pruebas.getPruebaById`

- `POST /api/pruebas/:id/pregunta/`
  - Description: Create a new pregunta and associate it with a prueba.
  - Parameters:
    - `id` (Path): ID of the prueba to associate the pregunta with.
    - `preguntaText` (Body): Text of the pregunta.
    - `preguntaTipo` (Body): Type of the pregunta.
    - `preguntaDificultad` (Body): Difficulty of the pregunta.
  - Middlewares:
    - `validateId`: Validate that the ID is a valid number.
  - Controller: `pruebas.postPreguntaPruebaById`

## Grupos

- `GET /api/grupos/`
  - Description: Get all grupos.
  - Controller: `grupos.getGrupos`

- `GET /api/grupos/:id/`
  - Description: Get a grupo by ID.
  - Parameters:
    - `id` (Path): ID of the grupo.
  - Middlewares:
    - `validateId`: Validate that the ID is a valid number.
  - Controller: `grupos.getGrupoById`

- `POST /api/grupos/new/`
  - Description: Create a new grupo.
  - Parameters:
    - `grup_nombre` (Body): Nombre of the grupo.
    - `grup_estilo_visual` (Body): Estilo visual of the grupo.
    - `usu_usuario_grupo` (Body): Usuario grupo.
  - Controller: `grupos.createGrupo`


## Evaluaciones

- `GET /api/evaluaciones/`
  - Description: Get all evaluaciones.
  - Controller: `evaluaciones.getEvaluaciones`

- `GET /api/evaluaciones/activas/`
  - Description: Get active evaluaciones.
  - Controller: `evaluaciones.getEvaluacionesActivas`

- `GET /api/evaluaciones/:id/`
  - Description: Get an evaluacion by ID.
  - Parameters:
    - `id` (Path): ID of the evaluacion.
  - Middlewares:
    - `validateId`: Validate that the ID is a valid number.
  - Controller: `evaluaciones.getEvaluacionById`

- `POST /api/evaluaciones/new/`
  - Description: Create a new evaluacion.
  - Parameters:
    - `eval_nombre` (Body): Name of the evaluacion.
    - `eval_fecha_creado` (Body): Date and time when the evaluacion was created (in UTC format).
    - `eval_fecha_termino` (Body): Date and time when the evaluacion will end (in UTC format).
    - `eval_instrucciones` (Body): Instructions for the evaluacion.
    - `prueba` (Body): Object containing the ID of the associated prueba.
    - `grupo` (Body): Object containing the ID of the associated grupo.
  - Controller: `evaluaciones.createEvaluacion`