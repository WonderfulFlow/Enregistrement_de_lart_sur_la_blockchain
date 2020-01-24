import React from "react";
import BuyPageGetImage from "./BuyPage_GetImage";

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
    cardContent: {
        flexGrow: 1,
    },
}));

class BuyPageGenerateContent extends React.Component {
    componentDidMount() {
        const { match: { params } } = this.props;
        const artwork_id = params.id;
        this.props.fetchData(artwork_id);
    }

    render(){
        const { classes } = this.props;
        let buyPage = null;
        if(this.props.data){
            buyPage = <BuyPageGetImage classes={classes}
                                       data={this.props.data}/>;
        }

        return buyPage;
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

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(BuyPageGenerateContent));


