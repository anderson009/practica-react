import axios from 'axios';

export const ClientHttp = axios.create({
    baseURL: ('http://localhost:3004') + '/api',
});