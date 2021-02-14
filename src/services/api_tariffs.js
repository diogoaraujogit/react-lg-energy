import axios from 'axios';

const api_tariffs = axios.create({
  baseURL: process.env.REACT_APP_TARIFFS
})

export default api_tariffs;