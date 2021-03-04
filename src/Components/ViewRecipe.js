import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { getRecipe } from './Database';
import { Skeleton } from '@material-ui/lab';

const ViewRecipe = () => {
    const [recipe, setRecipe] = useState(null);

    const RenderRecipeCard = (recipeData) => {
        return (
            <Card color="secondary">
                <CardHeader title={recipeData.title} />
                <CardMedia>
                    {recipeData.image === "" ? <Skeleton variant="rect" animation={false} width={"100%"} height={250} /> : <img src={recipeData.image} style={{ maxWidth: '100%', maxHeight: '250px' }} alt="Uploaded" />}
                </CardMedia>
                <CardContent>
                    <Typography variant="h6" align="left">
                        Ingredients
                        </Typography>
                    <ul>
                        <Typography variant="body1" align="left">
                            {recipeData.ingredients.map(ingredient => {
                                return <li key={ingredient.name}>{ingredient.amount + ' ' + ingredient.name}</li>
                            })}
                        </Typography>
                    </ul>

                    <Typography variant="h6" align="left">
                        Instructions
                        </Typography>
                    <ol>
                        <Typography variant="body1" align="left">
                            {recipeData.instructions.map(instruction => {
                                return <li key={instruction}>{instruction}</li>
                            })}
                        </Typography>
                    </ol>
                </CardContent>
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
    useEffect(() => {
        getRecipe(slug.recipeId).then((res) => {
            setRecipe(res);
        });
    }, [slug.recipeId])

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