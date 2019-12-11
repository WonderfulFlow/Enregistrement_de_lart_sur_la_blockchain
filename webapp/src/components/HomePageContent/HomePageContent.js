import React from 'react';
import * as routes from "../../routes";
import Footer from "../Footer/Footer";
import HeadSection from "../HeadSection/HeadSection";

import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline,
         Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom";

const homePageContent = (props) => (
    <>
        <CssBaseline />
        <main>
            <div className={props.classes.heroContent}>
                <HeadSection title={"Art Blockchain"}
                            subtitle={"Achetez ou mettez en vente des oeuvres d'art de façon sécurisée grâce " +
                                    "à \"Art Blockchain\", le\n nouveau service en ligne de vente d'oeuvres " +
                                    "d'arts utilisant la blockchain Ethereum pour enregistrer et prouver la " +
                                    "possession d'une oeuvre."}>
                    <div className={props.classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                <Link to={routes.BUY}>
                                    <Button variant="contained" color="primary">
                                        Parcourir les ventes
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={routes.MISEVENTE}>
                                    <Button variant="outlined" color="primary">
                                        Mettre en vente
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </HeadSection>
            </div>
            <Container className={props.classes.cardGrid} maxWidth="md">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom
                            className={"titleTrending"}>
                    Populaires en ce moment
                </Typography>
                <Grid container spacing={4}>
                    {Object.keys(props.data).map(key => (
                        <Grid item key={key} xs={12} sm={6} md={4}>
                            <Card className={props.classes.card}>
                                <CardMedia
                                    className={props.classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={props.classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {props.data[key].name}
                                    </Typography>
                                    <Typography>
                                        {props.data[key].description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        <Link to={routes.BUY + key}>
                                            Commander
                                        </Link>
                                    </Button>
                                    <div className={"divSpace"}/>
                                    <small>{props.data[key].price}€</small>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
        <Footer/>
    </>
);

export default homePageContent;