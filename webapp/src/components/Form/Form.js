import React from "react";
import { Button, Input, TextField } from "@material-ui/core";

const form = (props) => (
    <div>
        <div>
            <TextField required id="artist" label="Nom de l'artiste"
                       defaultValue=" " margin="normal"
                       onChange={(event) => props.onChange(event.target.value, "artiste")}/>
        </div>
        <div>
            <TextField required id="name" label="Nom de l'oeuvre"
                       defaultValue=" " margin="normal"
                       onChange={(event) => props.onChange(event.target.value, "name")}/>
        </div>
        <div>
            <TextField id="bio" label="Description de l'oeuvre"
                       defaultValue=" " margin="normal" variant = "outlined"
                       onChange={(event) => props.onChange(event.target.value, "description")}/>
        </div>
        <div>
            <TextField required id="price" label="Prix total de l'oeuvre"
                       defaultValue=" " margin="normal"
                       onChange={(event) => props.onChange(event.target.value, "price")}/>
        </div>
        <br/><br/>
        <div>
            <Input
                type={"file"}
                accept={"image/*"}
                aria-describedby="inputGroupFileAddon01"
                placeholder={"test"}
                onChange={props.uploadImage}/>
        </div>
        <br/><br/>
        <Button type="button" onClick={props.openMosaique}>
            Suivant
        </Button>
    </div>
);

export default form;