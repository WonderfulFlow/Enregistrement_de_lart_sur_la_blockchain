import React from "react";
import HeadSection from "../HeadSection/HeadSection";
import "./CatalogueContent.css";

import { TextField, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography } from "@material-ui/core";


const homeContent = (props) => (
    <>
        <CssBaseline />
        <main>
            <Container className={props.classes.cardGrid} maxWidth="md">
                <HeadSection title={"Mettez en vente vos oeuvres"}
                            subtitle={"Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis en " +
                            "vente. Il est alors possible d'acheter et d'être le propriétaire de parties de votre " +
                            "oeuvre."}/>
                <div className={"filterInput"}>
                    <TextField
                        id="standard-basic" className={props.classes.textField} margin="normal"
                        onChange={(event) => props.changeFilter(event)} label="Chercher une oeuvre"
                    />
                </div>
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
                                        Commander
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
    </>
);

export default homeContent;