import React from 'react';
import logo from "../../img/logo.png";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

const appBar = (props) => {
    return (
        <AppBar position="relative">
            <Toolbar>
                <img className={props.icon} src={logo}/>
                <Typography variant="h6" color="inherit" noWrap>
                    ArtBlockchain
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default appBar;