import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { addRecipe } from './Database';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";

const NewRecipe = () => {
    const [recipe, setRecipe] = useState({
        title: '',
        image: '',
        ingredients: [],
        instructions: []
    });

    const SetTitle = (value) => {
        setRecipe({ ...recipe, title: value });
    }

    const SetImage = (files) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (e) => {
            setRecipe({ ...recipe, image: e.target.result });
        }
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

    const AddInstructionElement = () => {
        let newInstructions = recipe.instructions;
        newInstructions.push("");
        setRecipe({ ...recipe, instructions: newInstructions });
    }

    const RemoveInstructionElement = (index) => {
        let newInstructions = recipe.instructions;
        newInstructions.splice(index, 1);
        setRecipe({ ...recipe, instructions: newInstructions });
    }

    const SetInstructionElement = (index, value) => {
        let newInstructions = [...recipe.instructions];
        newInstructions[index] = value;
        setRecipe({ ...recipe, instructions: newInstructions });
    }

    const HandleSubmit = (event) => {
        event.preventDefault();

        if (recipe.image === '') {
            window.alert('Please upload the featured image');
            return;
        }
        if (recipe.ingredients.length === 0) {
            window.alert('Please list at least one ingredient');
            return;
        }
        else if (recipe.instructions.length === 0) {
            window.alert('Please list at least one instruction');
            return;
        }

        addRecipe(recipe).then(() => {
            window.alert("Recipe has been created successfully. Press 'OK' to be redirected to the home page.");
            document.location.href = '/';
        }).catch((error) => {
            console.log("Unable to create recipe", error)
            window.alert("Unable to create recipe. Please try again later.")
        });
    }

    const RenderRecipeCard = () => {
        return (
            <Card color="secondary">
                <CardHeader title="Create recipe" />
                <CardContent>
                    <form autoComplete="off" onSubmit={HandleSubmit}>

                        <Typography align="left">Title</Typography>
                        <TextField required fullWidth value={recipe.title} onChange={(e) => { SetTitle(e.target.value) }} />
                        <div style={{ height: "40px" }} />


                        <Typography align="left">Featured image</Typography>
                        {recipe.image === '' ? '' : <img src={recipe.image} style={{ maxWidth: '100%', maxHeight: '250px' }} alt="Uploaded" />}
                        <div style={{ height: "20px" }} />
                        <Button variant="outlined" component='label'>
                            {recipe.image === '' ? 'Upload image' : 'Reupload image'}
                            <input type='file' accept="image/*" hidden onChange={(e) => SetImage(e.target.files)} />
                        </Button>
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


                        <Typography align="left">Instructions</Typography>
                        <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                            spacing={1}
                        >
                            {recipe.instructions != null ? recipe.instructions.map((instruction, i) => {
                                return <React.Fragment key={"instruction" + i}>
                                    <Grid item xs={12} sm={10}>
                                        <TextField required label="Instruction" multiline fullWidth value={instruction.name} onChange={(e) => { SetInstructionElement(i, e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button variant="outlined" onClick={() => RemoveInstructionElement(i)}>Remove</Button>
                                    </Grid></React.Fragment>
                            }) : <></>}
                        </Grid>
                        <div style={{ height: "20px" }} />
                        <Button variant="outlined" onClick={AddInstructionElement}>
                            Add step
                        </Button>

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

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="stretch">
            <Grid item xs={12} sm={10} md={8} lg={6}>
                {RenderRecipeCard()}
            </Grid>
        </Grid>
    );
}

export default NewRecipe;