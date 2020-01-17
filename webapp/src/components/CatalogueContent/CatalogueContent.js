import React from "react";
import HeadSection from "../HeadSection/HeadSection";
import ArtworkGrid from "../ArtworkGrid/ArtworkGrid";
import Footer from "../Footer/Footer";
import "./CatalogueContent.css";

import { TextField, Container, CssBaseline } from "@material-ui/core";

const catalogueContent = (props) => (
    <>
        <CssBaseline />
        <main>
            <Container className={props.classes.cardGrid} maxWidth="md">
                <HeadSection title={"Mettez en vente vos oeuvres"}
                             subtitle={"Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis en " +
                             "vente. Il est alors possible d'acheter et d'être le propriétaire de parties de votre " +
                             "oeuvre."}/>
                <div className={"filterInput"}>
                    <TextField id="standard-basic"
                               className={props.classes.textField}
                               margin="normal"
                               onChange={(event) => props.filterData(event)}
                               label="Chercher une oeuvre"/>
                </div>
                <ArtworkGrid data={props.filteredData}
                             classes={props.classes}/>
            </Container>
        </main>
        <Footer/>
    </>
);

export default catalogueContent;