import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raynold-recipe-app-backend.herokuapp.com/'
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