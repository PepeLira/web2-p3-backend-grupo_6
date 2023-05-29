const { BAD_REQUEST } = require("../utils/response.status");

function validateId(req, res, next) {
    const id = req.params.id;
  
    if (isNaN(id)) {
      return res.status(BAD_REQUEST).json({ message: 'ID inválido' });
    }
  
    // Puedes almacenar el ID validado en el objeto de solicitud si deseas acceder a él en otros controladores
    req.validatedId = parseInt(id);
  
    next();
  }
  
  module.exports = validateId;
  