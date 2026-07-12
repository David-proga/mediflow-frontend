JavaScript

import axios from 'axios';

const api = axios.create({
  // Lo dejamos libre para que no interfiera con las URLs completas
});

export default api;