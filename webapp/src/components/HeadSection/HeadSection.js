import React from "react";
import { Typography } from "@material-ui/core";

const headSection = (props) => (
    <>
        <br/><br/>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            {props.title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {props.subtitle}
        </Typography>
        <br/><hr/><br/>
    </>
);

export default headSection;