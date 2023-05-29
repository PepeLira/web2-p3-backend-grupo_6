const gruposService = require('../services/grupos.service')



const getGrupos = async ( req, res) => {
  try {
    const grupos = await gruposService.getGrupos();
    res.status(grupos.status).json(grupos.data);
  } catch (error) {
    console.log(error);
    // Manejo de error
    res.status(500).json({ error: 'Error al obtener las grupos' });
  }
}


const getGrupoById = async ( req, res) => {
  try {
    let grupoId = req.params.id;
    const grupos = await gruposService.getGrupoById(grupoId);
    res.status(grupos.status).json(grupos.data);
  } catch (error) {
    console.log(error);
  }
}

async function createGrupo(req, res) {
  const { grup_nombre, grup_estilo_visual, usu_usuario_grupo } = req.body;

  try {
    const createdGrupo = await gruposService.createGrupo(grup_nombre, grup_estilo_visual, usu_usuario_grupo);

    // Return a success response
    res.status(200).json(createdGrupo);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Error creating grupo' });
  }
}

module.exports = {
    getGrupos,
    getGrupoById,
    createGrupo
}
