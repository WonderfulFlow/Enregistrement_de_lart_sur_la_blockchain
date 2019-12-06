import React from "react";
import { TextField, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography } from "@material-ui/core";
import "./CatalogueContent.css";
import HeadSection from "../HeadSection/HeadSection";

const homeContent = (props) => (
    <>
        <CssBaseline />
        <main>
            <Container className={props.classes.cardGrid} maxWidth="md">
                <HeadSection title={"Mettez en vente vos oeuvres"}
                            subtitle={"Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis en " +
                            "vente. Il est alors possible d'acheter et d'être le propriétaire de parties de votre " +
                            "oeuvre."}/>
                <TextField
                    id="standard-basic"
                    className={props.classes.textField}
                    onChange={(event) => props.changeFilter(event)}
                    label="Chercher une oeuvre"
                    margin="normal"
                />
                <Grid container spacing={4}>
                    {props.filteredCards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card className={props.classes.card}>
                                <CardMedia
                                    className={props.classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={props.classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.name}
                                    </Typography>
                                    <Typography>
                                        {card.reknown}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Commander
                                    </Button>
                                    <div className={"divSpace"}/>
                                    <small>{card.bio.length}€</small>
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