import React from "react";
import HomePageContent from "../../components/HomePageContent/HomePageContent";

import { connect } from "react-redux";
import * as actions_artwork from "../../store/actions/actions_artworks";

import { makeStyles, withStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

class HomePage extends React.Component {
    componentDidMount() {
        this.props.fetchData(null, 3);
    }

    render(){
        console.log(this.props.data);
        const { classes } = this.props;
        let homePageContent = null;
        if(this.props.data) homePageContent = <HomePageContent classes={classes} data={this.props.data}/>;

        return homePageContent;
    }
}

const mapStateToProps = state => {
    return {
        data: state.artworks.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions_artwork.getData(null, 3)),
    };
};


export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));