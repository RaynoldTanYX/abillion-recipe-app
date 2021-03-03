import axios from 'axios';

const api = axios.create({
    baseURL: 'https://raynold-recipe-app-backend.herokuapp.com/recipes'
    // baseURL: 'http://localhost:3000/recipes'
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

export const getRecipe = (id) => {
    return api.get(`/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const editRecipe = (id, recipe) => {
    return api.patch(`/${id}`, recipe)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export const addRecipe = (recipe) => {
    return api.post(`/`, recipe)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export const deleteRecipe = (id) => {
    return api.delete(`/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}