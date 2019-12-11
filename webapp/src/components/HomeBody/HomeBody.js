import React from 'react';

import { Container, Typography } from "@material-ui/core";
//import { artblockchain2_ABI, artblockchain2_ADRESS } from '../../config' //to be changed somehow

const homeBody = (props) => {
    
    return (
        
        <main>
            <div className={props.heroContent}  style={{ minHeight:"75vh" }}>
                <Container maxWidth="sm" style={{color: "lightblue"}}>
                    <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>

                    </Typography>
                    <br/><br/>
                    <Typography variant="h5" align="center" color="inherit" paragraph>
                        Vous êtes actuellement sur le serveur : {props.network}
                        <br/><br/>
                        Votre numéro de compte : {props.account}
                        <br/><br/> 
                        Le numéro du dernier block : {props.lastBlock}
                        <br/><br/>
                        <input type="text" placeholder="ID du token" onChange={props.onChange_Token_Id}/>
                        Le proprietaire du 1er token est : {props.nb_oeuvres}
                        
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
                    <label>NB COLS</label>
                    <input type="number" value={props.valueNbCols} style={{ marginLeft: "10px" }} min={5} max={20}
                           onChange={(event) => props.changeInputMosaique(event, {division: "nb_cols", dimension: "width"})}/>
                    <br/>
                    <label>NB ROWS</label>
                    <input type="number" value={props.valueNbRows} style={{ marginLeft: "10px" }} min={5} max={20}
                           onChange={(event) => props.changeInputMosaique(event, {division: "nb_rows", dimension: "height"})}/>
                    <br/><br/>
                    <Typography variant="h5" align="center" color="inherit" paragraph>
                        Preview de l'image uploadée :
                    </Typography>
                </Container>

                {props.children}
            </div>
        </main>
    );
};

export default homeBody;