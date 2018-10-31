import axios from 'axios';

export const BASE_URL = 'http://symfony.localhost/';

axios.defaults.baseURL = BASE_URL;

export default axios;