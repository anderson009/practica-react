import { ClientHttp } from './client_http';

export const ApiService = {

    async login(valores) {
        const { data } = await ClientHttp.post('/login', valores);

        return data;
    },

    async register(valores) {
        const { data } = await ClientHttp.post('/register', valores);

        return data;
    },

    async getVentas() {
        const { data } = await ClientHttp.get('/ventas');

        return data;
    },

    async getMyUser() {
        const { data } = await ClientHttp.get('/register/my_profile');

        return data;
    },


}