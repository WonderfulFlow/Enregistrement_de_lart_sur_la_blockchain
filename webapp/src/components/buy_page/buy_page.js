import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@material-ui/core";

const buy_page = (props) => (
    <Container maxWidth="sm">
        <Card className={props.classes.card}>
            <CardMedia className={props.classes.cardMedia} image="https://source.unsplash.com/random"
                       title="Image title"/>
            <CardContent className={props.classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.data.name}
                </Typography>
                <Typography>
                    {props.data.description}
                    
                </Typography>
                <Typography>
                    {props.data.Artiste}
                </Typography>
                <Typography>
                    {props.data.supply}
                </Typography>
                <Typography>
                    {props.data.contract_address}
                    
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={props.clicked} >
                    View
                </Button>
                <Button size="small" color="primary" onClick={props.clicking} >
                    Edit
                </Button>
            </CardActions>
        </Card>
    </Container>
);

export default buy_page;