import React from 'react';

import { Typography } from "@material-ui/core";

const footer = (props) => {
    return (
        <footer className={props.footerClass}>
            <Typography variant="h6" align="center" gutterBottom>
                Projet "Enregistrer de l'art sur la Blockchain" de M. Henri Lieutaud réalisé par :
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Halim Amady | Alexis Menduni | Osmane Belhadjouri | Maxime Campane
            </Typography>
        </footer>
    )
};

export default footer;