const prisma = require('../services/prisma.service');

// obtener un usuario por id
async function getUsuarioById(id) {
    try {
        await prisma.$connect();
        const usuario = await prisma.usu_usuario.findUnique({
            where: {
                usu_id: id
            }
        });

        return usuario !== null ? usuario : false;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener usuario por id');
    }
}

module.exports = {
    getUsuarioById
}