import React from 'react';
import logo from "../../img/logo.png";
import NavBarLink from "../NavBarLink/NavBarLink";
import "./AppBar.css";
import * as routes from "../../routes";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

const appBar = (props) => {
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <img className={props.icon} src={logo} alt={"Fond"}/>
                    <Typography variant="h6" color="inherit" noWrap>
                        ArtBlockchain
                    </Typography>
                    <div className={"divExpand"}/>
                    <NavBarLink url={routes.HOME}>Home</NavBarLink>
                    <NavBarLink url={routes.BROWSE}>Parcourir les oeuvres</NavBarLink>
                    <NavBarLink url={routes.MISEVENTE}>Mettre en vente</NavBarLink>
                    <NavBarLink url={routes.Sell}>buy stuff</NavBarLink>

                </Toolbar>
            </AppBar>
            <div>
                {props.children}
            </div>
        </>
    );
};

export default appBar;