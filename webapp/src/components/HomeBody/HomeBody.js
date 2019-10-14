import React from 'react';

import { Container, Typography } from "@material-ui/core";

const homeBody = (props) => {
    return (
        <main>
            <div className={props.heroContent}  style={{ minHeight:"75vh" }}>
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
                    <br/><br/>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">
                                Upload
                            </span>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" onChange={props.uploadImage}
                                   id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                                   accept=".png,.jpg,.jpeg"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Choose file
                            </label>
                        </div>
                    </div>
                    <br/><br/>
                    <Typography variant="h5" align="center" color="inherit" paragraph>
                        Preview de l'image uploadée :
                    </Typography>
                </Container>

                <div className={"preview-container"}>
                    {props.imagePreview}
                </div>
            </div>
        </main>
    );
};

export default homeBody;