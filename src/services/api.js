import axios from 'axios';

const apiCep = axios.create({
    baseURL:'http://www.estrelafriosapp.com.br'
});

export default apiCep;