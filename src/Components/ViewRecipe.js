import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { getRecipe } from './Database';
import { Skeleton } from '@material-ui/lab';

// let recipe = [
//     {
//         title: 'Lorem Ipsum', 
//         image: 'no image', 
//         ingredients: [
//             {name: 'Lorem', amount: '100g'}, 
//             {name: 'Ipsum', amount: '500ml'}
//         ], 
//         instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//     }
// ];

const ViewRecipe = () => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
    }, [])

    const RenderRecipeCard = (recipeData) => {
        return (
            <Card color="secondary">
                <CardHeader title={recipeData.title} />
                <CardMedia>
                    <Skeleton variant="rect" animation={false} width={"100%"} height={500} />
                    {/* {recipeData.image} */}
                </CardMedia>
                <CardContent>
                    <ul>
                        <Typography variant="body1" align="left">
                            {recipeData.ingredients.map(ingredient => {
                                return <li key={ingredient.name}>{ingredient.amount + ' ' + ingredient.name}</li>
                            })}
                        </Typography>
                    </ul>
                    <Typography variant="body2" align="left">
                        {recipeData.instructions}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Link to={'/view/'+recipeData._id}>
                        <IconButton color="primary">
                            <ViewIcon/>
                        </IconButton>
                    </Link>
                    <Link to={'/edit/'+recipeData._id}>
                        <IconButton color="secondary">
                            <EditIcon/>
                        </IconButton>
                    </Link>
                </CardActions> */}
            </Card>
        );
    }

    const RenderSkeletonCard = () => {
        return (
            <Card color="secondary">
                <Skeleton variant="text" animation="wave" height={50} />
                <CardMedia>
                    <Skeleton variant="rect" animation="wave" height={250} />
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" align="left">
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" width={"80%"} />
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    let slug = useParams();
    if (recipe == null) {
        console.log(slug.recipeId);
        getRecipe(slug.recipeId).then((res) => {
            setRecipe(res);
        });
    }

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
            style={{ padding: 15 }}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                {recipe == null ? RenderSkeletonCard() : RenderRecipeCard(recipe)}
            </Grid>
        </Grid>
    );
}

export default ViewRecipe;