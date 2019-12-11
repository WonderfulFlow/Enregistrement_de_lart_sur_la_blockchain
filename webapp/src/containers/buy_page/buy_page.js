import React from "react";
import BuyPage from "../../components/buy_page/buy_page";

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

class Buyingpage extends React.Component{
    constructor(props){
        super(props);
    }

    // componentDidMount(){
    //     this.props.fetchData();
    //
    // }

    componentDidMount() {
        const {match: {params}} = this.props;
        console.log(params.id);
    }

    render(){
        const { classes } = this.props;

        return (
            <>
                <button onClick={this.props.fetchData}>fetch data</button>
                <BuyPage classes={classes}/>
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
        fetchData: () => dispatch(actions_artworks.getData()),
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Buyingpage));


