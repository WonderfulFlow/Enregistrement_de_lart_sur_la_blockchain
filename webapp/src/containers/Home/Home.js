import React from 'react';
import background from '../../img/background.png';
import AppBar from '../../components/AppBar/AppBar';
import HomeBody from '../../components/HomeBody/HomeBody';
import Footer from '../../components/Footer/Footer';

import { makeStyles, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
        width: '75px'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: "url(" + background + ")",
        padding: theme.spacing(8, 0, 6)
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Album(props) {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar icon={classes.icon}/>
            <HomeBody heroContent={classes.heroContent}
                    network={props.network}
                    account={props.account}
                    lastBlock={props.lastBlock}/>
            <Footer footerClass={classes.footer}/>
        </>
    );
}