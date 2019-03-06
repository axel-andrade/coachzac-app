import axios from 'axios';
const Define = require('../config/Define.js');
/*
  http://localhost:1982/use 

  android studio: http://10.0.2.2:1982/use
  genymotion: http://10.0.3.2:1982/use
 */
//'https://coachzac-v2-api.herokuapp.com/use/functions'

const api = axios.create({
    baseURL: Define.baseURL+'/functions',
});

export default api;