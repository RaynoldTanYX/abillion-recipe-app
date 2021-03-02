import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

let recipe = [
    {
        title: 'Lorem Ipsum', 
        image: 'no image', 
        ingredients: [
            {name: 'Lorem', amount: '100g'}, 
            {name: 'Ipsum', amount: '500ml'}
        ], 
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
];

const ViewRecipe = () => {
    let slug = useParams();
    console.log(slug);
    return (
        <div>
            recipeId: {slug.recipeId}
        </div>
    );
}

export default ViewRecipe;