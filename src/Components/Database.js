import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/recipes'
});

export const getRecipeList = () => {
    return api.get('/')
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return Promise.reject(err);
    });
};