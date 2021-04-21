import axios from 'axios';

const thisAxios = axios.create({
    baseURL: 'https://vue-coach-6db31-default-rtdb.firebaseio.com/',
});

export default thisAxios;
