import React from "react";
import {Button, Link, Toolbar} from "@material-ui/core";
import "./NavBarLink.css";

const navBarLink = (props) => (
    <div className={"navBarLink"}>
        <Link href={props.url}>
            <Button variant="outlined" color={"secondary"}>{props.children}</Button>
        </Link>
    </div>
);

export default navBarLink;