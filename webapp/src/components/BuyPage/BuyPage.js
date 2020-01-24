import React from "react";
import "./BuyPage.css";
import { Card, CardActions, CardContent, Container, Typography } from "@material-ui/core";

const buyPage = (props) => (
    <Container maxWidth="sm">
        <Card className={props.classes.card + " divCardArtwork"}>
            <CardContent className={props.classes.cardContent}>
                <Typography gutterBottom
                            variant="h5"
                            component="h2">
                    Nom de l'oeuvre : {props.data.name}
                </Typography>
                <Typography>
                    Auteur : {props.data.artist_name}
                </Typography>
                <Typography>
                    Description {props.data.description}
                </Typography>
                <Typography>
                    Prix par case :  {(props.data.price/1000000000000000000) + " eth" }
                </Typography>
                <div className={"divArtwork"}>
                    {props.children}
                </div>
            </CardContent>
            <CardActions>
                { props.actionButton }
            </CardActions>
        </Card>
    </Container>
);

export default buyPage;