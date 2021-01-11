import axios from 'axios';

const api_server = axios.create({
    baseURL: process.env.REACT_APP_SERVER
})

export default api_server;
