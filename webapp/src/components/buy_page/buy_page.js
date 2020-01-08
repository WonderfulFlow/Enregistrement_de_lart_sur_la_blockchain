import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography, TextField } from "@material-ui/core";

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
                <TextField required id="numero de token" label="token a acheter"
                       defaultValue=" " margin="normal"
                       onChange={(event) => props.onChange(event.target.value, "token_id")}/>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={props.clicked} >
                    number of token
                </Button>
                <Button size="small" color="primary" onClick={props.clicking} >
                    buy 1 token
                </Button>
            </CardActions>
        </Card>
    </Container>
);

export default buy_page;