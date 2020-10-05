import axios from 'axios';

const api_logs = axios.create({
    baseURL: process.env.REACT_APP_LOGS
})

export default api_logs
