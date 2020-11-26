import axios from 'axios';

const api_reports = axios.create({
  baseURL: process.env.REACT_APP_REPORTS
});

export default api_reports;