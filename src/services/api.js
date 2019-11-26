import axios from 'axios';

const api = axios.create({
  baseURL: 'https://peoplepj.herokuapp.com/api',
});

export default api;
