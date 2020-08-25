import axios from 'axios';

// Conexão com a url da API
const api_crud = axios.create({
    //baseURL: 'http://daikin.grupoicts.com.br:3003'
    baseURL: process.env.REACT_APP_CRUD
    //baseURL: 'http://35.223.103.64:3003'
})

export default api_crud
