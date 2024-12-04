import axios from 'axios';


const API = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
