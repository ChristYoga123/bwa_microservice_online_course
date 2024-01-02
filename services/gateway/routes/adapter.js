// Forward requests from client to services
require('dotenv').config();
const axios = require('axios');
const {APP_TIMEOUT} = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: parseInt(APP_TIMEOUT),
        headers: {'X-Custom-Header': 'foobar'}
    })
}