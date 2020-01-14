import React from 'react';
import "./HomePageContent.css";
import * as routes from "../../routes";
import Footer from "../Footer/Footer";
import HeadSection from "../HeadSection/HeadSection";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";

import { Button, CssBaseline, Grid, Typography, Container } from '@material-ui/core';
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
                                <Link to={routes.BROWSE}>
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
                <Typography component="h1"
                            variant="h4"
                            align="center"
                            color="textPrimary"
                            gutterBottom>
                    Populaires en ce moment
                </Typography>
                <ArtworkGrid data={props.data}
                             classes={props.classes}/>
            </Container>
        </main>
        <Footer position={"absolute"}/>
    </>
);

export default homePageContent;