const { OK } = require("../utils/response.status")
const testService = require('../services/tests.service');


const testApiCall = async (request, response) => {
    const resp = await testService.testApiCall();
    response.status(resp.status).json(resp)
}


module.exports = {
    testApiCall
}