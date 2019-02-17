import axios from 'axios';
/*
  http://localhost:1982/use 

  android studio: http://10.0.2.2:1982/use
  genymotion: http://10.0.3.2:1982/use
 */
//'https://coachzac-api.herokuapp.com/use/functions'

const api = axios.create({
    baseURL: 'https://coachzac-v2-api.herokuapp.com/use/functions',
});

export default api;