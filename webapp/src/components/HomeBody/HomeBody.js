import React from 'react';

import { Container, Typography } from "@material-ui/core";

const homeBody = (props) => {
    return (
        <main>
            <div className={props.heroContent}>
                <Container maxWidth="sm" style={{color: "lightblue"}}>
                    <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                        ArtBlockchain
                    </Typography>
                    <br/><br/>
                    <Typography variant="h5" align="center" color="inherit" paragraph>
                        Vous êtes actuellement sur le serveur : {props.network}
                        <br/><br/>
                        Votre numéro de compte : {props.account}
                        <br/><br/>
                        Le numéro du dernier block : {props.lastBlock}
                    </Typography>
                </Container>
            </div>
        </main>
    );
};

export default homeBody;