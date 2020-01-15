import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@material-ui/core";

const buyPage = (props) => (
    <Container maxWidth="sm">
        <Card className={props.classes.card} style={{marginTop: '25px'}}>
            <CardMedia className={props.classes.cardMedia}
                       image="https://source.unsplash.com/random"
                       title="Image title"/>
            <CardContent className={props.classes.cardContent}>
                <Typography gutterBottom
                            variant="h5"
                            component="h2">
                    {props.data.name}
                </Typography>
                <Typography>
                    {props.data.description}
                </Typography>
                <Typography>
                    { "Prix par case : " + props.data.price + "€" }
                </Typography>
                <div style={{marginTop: "50px"}}>
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