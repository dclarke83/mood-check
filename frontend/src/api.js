import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/v1/';

export default axios.create({
    baseURL: apiUrl
});