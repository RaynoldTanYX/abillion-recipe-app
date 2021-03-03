import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { getRecipeList } from './Database';
import { Link } from "react-router-dom";
import { Skeleton } from '@material-ui/lab';

const ViewRecipeList = () => {

    const [recipeList, setRecipeList] = useState([
        // {
        //     key: 1,
        //     title: 'Lorem Ipsum', 
        //     image: 'no image', 
        //     ingredients: [
        //         {name: 'Lorem', amount: '100g'}, 
        //         {name: 'Ipsum', amount: '500ml'}
        //     ], 
        //     instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        // },
        // {
        //     key: 2,
        //     title: 'Lorem Ipsum', 
        //     image: 'no image', 
        //     ingredients: [
        //         {name: 'Lorem', amount: '100g'}, 
        //         {name: 'Ipsum', amount: '500ml'}
        //     ], 
        //     instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        // }
    ]);

    useEffect(() => {
        getRecipeList().then((res) => {
            setRecipeList(res);
        });
    }, [])


    const RenderRecipeCard = (recipeData) => {
        return (
            <Card color="secondary">
                <CardHeader title={recipeData.title} />
                <CardMedia>
                    <Skeleton variant="rect" animation={false} width={"100%"} height={250} />
                    {/* {recipeData.image} */}
                </CardMedia>
                <CardContent>
                    {/* <ul>
                        <Typography variant="body1" align="left">
                            {recipeData.ingredients.map(ingredient => {
                                return <li key={ingredient.name}>{ingredient.amount + " of " + ingredient.name}</li>
                            })}
                        </Typography>
                    </ul> */}
                    <Typography variant="body2" align="left">
                        {recipeData.instructions.slice(0, 300) + "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={'/view/' + recipeData._id}>
                        <IconButton color="primary">
                            <ViewIcon />
                        </IconButton>
                    </Link>
                    <Link to={'/edit/' + recipeData._id}>
                        <IconButton color="secondary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                </CardActions>
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

    return (
        <>
            <Grid container item
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}
                style={{ padding: 30 }}
            >
                {
                    recipeList.length === 0
                        ?
                        <>
                            <Grid item xs={12} sm={10} md={8} lg={4} xl={3}>
                                {RenderSkeletonCard()}
                            </Grid>
                        </>
                        :
                        recipeList.map((recipe, i) => {
                            return (
                                <Grid item xs={12} sm={10} md={8} lg={4} xl={3} key={recipe._id}>
                                    {RenderRecipeCard(recipe)}
                                </Grid>
                            );
                        })
                }
            </Grid>
            <Link to='/new'>
                <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '10%', right: '10%' }}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}

export default ViewRecipeList;