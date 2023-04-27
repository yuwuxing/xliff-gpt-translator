const axios = require('axios');
const config = require('./config.json');

const apiKey = config.openai_api_key;

const axiosInstance = axios.create({
    baseURL: `${config.openai_api_baseurl}/v1/chat/completions`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
});

module.exports = axiosInstance;
