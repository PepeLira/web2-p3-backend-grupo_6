const grupoData = require('../data/grupos.data');
const usuarioData = require('../data/usuario.data');
const { OK, BAD_REQUEST, CREATED } = require('../utils/response.status');


async function getGrupos() {
    try {
        const grupos = await grupoData.getGrupos();
        return({status:  OK, data: grupos});
        
    } catch (error) {
        console.log(error);
        throw new Error('Error servicio getGrupos');
    }
}


async function getGrupoById(id) {
    try {
      const grupo = await grupoData.getGrupoById(parseInt(id));

      if (grupo === false) 
        return { status: BAD_REQUEST, data :  {message : 'ID invalido'}}
      return({status:  OK, data: grupo});
    } catch (error) {
      // Manejo de errores
      console.log(error);
      throw new Error('Error servicio getGrupoById');
    }
}

async function createGrupo(grup_nombre, grup_estilo_visual, usu_usuario_grupo) {
  try {
    var createdGrupo = null;
    const usuario  = await usuarioData.getUsuarioById(usu_usuario_grupo);
    if (usuario !== false) {
      createdGrupo = await grupoData.createGrupo(grup_nombre, grup_estilo_visual, usuario);
    }
    else {
      throw new Error('Error finding Usuario');
    }

    return { status: CREATED, data: createdGrupo };
  } catch (error) {
    // Manejo de error
    console.error(error); 
    throw new Error('Error creating grupo');
  }
}

module.exports = {
    getGrupos,
    getGrupoById, 
    createGrupo
}