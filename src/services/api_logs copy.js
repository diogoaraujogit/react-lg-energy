import axios from 'axios';

const api_notifications = axios.create({
    baseURL: process.env.REACT_APP_NOTIFICATIONS
})

export default api_notifications;
