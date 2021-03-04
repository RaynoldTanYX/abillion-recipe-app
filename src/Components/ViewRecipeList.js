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
                    {recipeData.image === "" ? <Skeleton variant="rect" animation={false} width={"100%"} height={250} /> : <img src={recipeData.image} style={{ maxWidth: '100%', maxHeight: '250px' }} alt="Uploaded" />}
                </CardMedia>
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
                style={{ padding: 15 }}
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