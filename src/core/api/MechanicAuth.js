import axios from 'axios';

export default axios.create({
    baseURL: 'https://mechaniconline.herokuapp.com/api/v1/mechanic',
        headers: {
        'Content-Type': 'application/json',
        }
    });