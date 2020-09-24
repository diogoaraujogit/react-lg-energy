import axios from 'axios';

const api_analytics = axios.create({
    baseURL: process.env.REACT_APP_ANALYTICS
})

export default api_analytics
