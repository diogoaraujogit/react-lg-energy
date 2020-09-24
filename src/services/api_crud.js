import axios from 'axios';

const api_crud = axios.create({
    baseURL: process.env.REACT_APP_CRUD
})

export default api_crud
