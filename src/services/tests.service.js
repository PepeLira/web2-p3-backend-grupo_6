const { OK } = require("../utils/response.status")



const testApiCall = async () => {
    return {
        status: OK, 
        message: "ok" 
    }
}


module.exports = { testApiCall }