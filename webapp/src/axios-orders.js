import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://art-blockchain.firebaseio.com/'
});

export default instance;