const prisma = require('../services/prisma.service');

async function getGrupos() {
  try {
    await prisma.$connect();
    const grupos = await prisma.grupo.findMany({
        select: {
            grup_id: true,
            grup_nombre: true
        }
    });
    return {
      grupos
    };
  } catch (error) {
    console.log(error);
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al obtener grupos');
  } finally {
    await prisma.$disconnect();
  }
}



async function getGrupoById(id) {
  try {
    await prisma.$connect();
    const grupo = await prisma.grupo.findUnique({
      where: {
        grup_id: id
      },
      select: {
        grup_id: true,
        grup_nombre: true,
        grupo_persona: {
          select: {
            persona: {
              select: {
                per_nombre: true,
                per_apellido: true,
                per_correo: true
              }
            }
          }
        }
      }
    });
    

    return grupo !== null ? grupo: false;

  } catch (error) {
    console.log(error);
    // Puedes lanzar una excepción para que quien llame a esta función pueda manejar el error
    throw new Error('Error al grupor por id');
  } finally {
    await prisma.$disconnect();
  }
}

async function createGrupo(grup_nombre, grup_estilo_visual, usu_usuario_grupo) {
  var createdGrupo = null;
  try {
    await prisma.$connect();
    
    createdGrupo = await prisma.grupo.create({
      data: {
        grup_nombre:            grup_nombre,
        grup_estilo_visual:     grup_estilo_visual,
      }
    });

    const createdUsuUsuarioGrupo = await prisma.usu_usuario_grupo.create({
      data: {
        grupo:   { connect: { grup_id: createdGrupo.grup_id } },
        usuario: { connect: { usu_id: usu_usuario_grupo.usu_id } },
      }
    });

    return { createdGrupo };
    
  } catch (error) {
    console.error(error);
    throw new Error('Error creating grupo');
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getGrupos,
  getGrupoById,
  createGrupo
};
