import React, {useState , useEffect} from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton} from '@material-ui/core';
import { Grid, Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import { getRecipeList } from './Database';
import {
  Link
} from "react-router-dom";

const ViewRecipeList = () => {

    const [recipeList, setRecipeList] = useState([
        {
            key: 1,
            title: 'Lorem Ipsum', 
            image: 'no image', 
            ingredients: [
                {name: 'Lorem', amount: '100g'}, 
                {name: 'Ipsum', amount: '500ml'}
            ], 
            instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            key: 2,
            title: 'Lorem Ipsum', 
            image: 'no image', 
            ingredients: [
                {name: 'Lorem', amount: '100g'}, 
                {name: 'Ipsum', amount: '500ml'}
            ], 
            instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]);

    useEffect(() => {
        getRecipeList().then((res) => {
            console.log(res);
            setRecipeList(res);
        });
    }, [])
    

    const RenderRecipeCard = (recipeData) => {
        return (
            <Card color="secondary">
                <CardHeader title={recipeData.title}/>
                <CardMedia>
                    {recipeData.image}
                </CardMedia>
                <CardContent>
                    <Typography variant="body1" align="left">
                        <ul>
                            {recipeData.ingredients.map(ingredient => {
                                return <li>{ingredient.amount + " of " + ingredient.name}</li>
                            })}
                        </ul>
                        {recipeData.instructions}
                    </Typography>
                </CardContent>
                <CardActions>
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
                </CardActions>
            </Card>
        );
    }

    return (
        <Grid container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
            {
                recipeList.map(recipe => {
                    return (
                        <Grid item xs={12} sm={10} md={8} lg={4} xl={3}>
                            {RenderRecipeCard(recipe)}
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}

export default ViewRecipeList;