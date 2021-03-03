import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { getRecipe, editRecipe, deleteRecipe } from './Database';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import { Skeleton } from '@material-ui/lab';

const EditRecipe = () => {
    const [recipe, setRecipe] = useState(null);

    const SetTitle = (value) => {
        setRecipe({ ...recipe, title: value });
    }

    const AddIngredientElement = () => {
        let newIngredients = recipe.ingredients;
        newIngredients.push({ name: "", amount: "" });
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const RemoveIngredientElement = (index) => {
        let newIngredients = recipe.ingredients;
        newIngredients.splice(index, 1);
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const SetIngredientElementName = (index, value) => {
        let newIngredients = [...recipe.ingredients];
        newIngredients[index].name = value;
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const SetIngredientElementAmount = (index, value) => {
        let newIngredients = recipe.ingredients;
        newIngredients[index].amount = value;
        setRecipe({ ...recipe, ingredients: newIngredients });
    }

    const SetInstructions = (value) => {
        setRecipe({ ...recipe, instructions: value });
    }

    const HandleSubmit = (event) => {
        event.preventDefault();
        editRecipe(recipe._id, recipe).then(() => {
            window.alert("Recipe has been edited successfully. Press 'OK' to be redirected to the home page.");
            document.location.href = '/';
        }).catch((error) => {
            console.log("Unable to edit recipe")
            console.log(error);
            window.alert("Unable to edit recipe. Please try again later.")
        });
    }

    const HandleDelete = () => {
        let confirmDelete = window.confirm("Please confirm that you want to delete this recipe");
        if (confirmDelete === true) {
            deleteRecipe(recipe._id).then(() => {
                window.alert("Recipe has been deleted successfully. Press 'OK' to be redirected to the home page.");
                document.location.href = '/';
            }).catch((error) => {
                console.log("Unable to delete recipe")
                console.log(error);
                window.alert("Unable to delete recipe. Please try again later.")
            });
        }
    }

    const RenderRecipeCard = () => {
        return (
            <Card color="secondary">
                <CardHeader title="Edit recipe" />
                <CardContent>
                    <form autoComplete="off" onSubmit={HandleSubmit}>

                        <TextField required label="Title" fullWidth value={recipe.title} onChange={(e) => { SetTitle(e.target.value) }} />
                        <div style={{ height: "40px" }} />

                        <Typography align="left">Ingredients</Typography>
                        <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                            spacing={1}
                        >
                            {recipe.ingredients != null ? recipe.ingredients.map((ingredient, i) => {
                                return <React.Fragment key={"ingredient" + i}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField required label="Ingredient" fullWidth value={ingredient.name} onChange={(e) => { SetIngredientElementName(i, e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField required label="Amount" fullWidth value={ingredient.amount} onChange={(e) => { SetIngredientElementAmount(i, e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button variant="outlined" onClick={() => RemoveIngredientElement(i)}>Remove</Button>
                                    </Grid></React.Fragment>
                            }) : <></>}
                        </Grid>
                        <div style={{ height: "20px" }} />
                        <Button variant="outlined" onClick={AddIngredientElement}>
                            Add ingredient
                            </Button>
                        <div style={{ height: "20px" }} />
                        <Divider />
                        <div style={{ height: "20px" }} />


                        <TextField required label="Description and Instructions" fullWidth multiline value={recipe.instructions} onChange={(e) => { SetInstructions(e.target.value) }} />

                        <div style={{ height: "40px" }} />
                        <Grid container
                            justify="flex-end"
                            alignItems="flex-start" spacing={1}>
                            <Grid item>
                                <Link to={'/'} style={{ textDecoration: "none" }}>
                                    <Button>Cancel</Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button onClick={HandleDelete}>Delete</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <ul>
                    </ul>
                </CardContent>
            </Card>
        );
    }

    const RenderSkeletonCard = () => {
        return (
            <Card color="secondary">
                <Skeleton variant="text" animation="wave" height={50} />
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
                {recipe == null ? RenderSkeletonCard() : RenderRecipeCard()}
            </Grid>
        </Grid>
    );
}

export default EditRecipe;