import React from "react";
import {Container, Typography} from "@material-ui/core";

const headSection = (props) => (
    <div>
        <Container maxWidth="sm">
        <br/>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {props.title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {props.subtitle}
        </Typography>
        {props.children}
        <br/><hr/><br/>
        </Container>
    </div>
);

export default headSection;