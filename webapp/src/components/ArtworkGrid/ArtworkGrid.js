import React from "react";
import "./ArtworkGrid.css";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as routes from "../../routes";

const artworkGrid = (props) => (
    <div className={"ArtworkGrid"}>
        <Grid container spacing={4}>
            {props.data.map((artwork, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={props.classes.card}>
                        <CardContent className={props.classes.cardContent}>
                            <Typography gutterBottom
                                        variant="h5"
                                        component="h2">
                                {artwork.name}
                            </Typography>
                            <Typography>
                                {artwork.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"
                                    color="primary">
                                <Link to={routes.BUY + artwork.id}>
                                    Commander
                                </Link>
                            </Button>
                            <div className={"divSpace"}/>
                            <small>{artwork.price/1000000000000000000} eth </small>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
);

export default artworkGrid;