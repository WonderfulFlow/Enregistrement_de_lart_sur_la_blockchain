import React from "react";
import BuyPage_GetImage from "./BuyPage_GetImage";
import Footer from "../../components/Footer/Footer";

import { makeStyles, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions_artworks from "../../store/actions/actions_artworks";

const useStyles = makeStyles(theme => ({
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
}));

class BuyPage_GenerateContent extends React.Component {
    componentDidMount() {
        const { match: { params } } = this.props;
        const artwork_id = params.id;
        this.props.fetchData(artwork_id);
    }

    render(){
        const { classes } = this.props;
        let buyPage = null;
        if(this.props.data){
            buyPage = <BuyPage_GetImage classes={classes}
                                        data={this.props.data}/>;
        }

        return (
            <>
                {buyPage}
                <Footer position={"absolute"}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.artworks.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (id) => dispatch(actions_artworks.getData(id)),
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(BuyPage_GenerateContent));


