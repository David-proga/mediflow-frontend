import axios from 'axios';

const api = axios.create({

  //  AHORA: Apunta al BFF
  baseURL: 'http://localhost:8082/api', 
});

export default api;