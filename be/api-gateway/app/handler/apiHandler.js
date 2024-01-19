require('dotenv').config();
const axios = require('axios');
const {API_TIMEOUT} = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseUrl: baseUrl,
        timeout: API_TIMEOUT,
    })
}