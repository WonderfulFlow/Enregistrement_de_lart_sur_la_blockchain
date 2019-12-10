import React from "react";
import CatalogueContent from "../../components/CatalogueContent/CatalogueContent";
import Form from "../../components/Form/Form";

import { withStyles, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions_artworks from "../../store/actions/actions_artworks";

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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
 
class Buyingpage extends React.Component{
    constructor(props){
        super(props);
    
    }

    componentDidMount(){
        this.props.fetchData();
      
    }

    render(){

        return(
            <button onClick={() => this.props.fetchData()}>deploy</button>
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


