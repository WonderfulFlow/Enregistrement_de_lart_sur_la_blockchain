import React from "react";
import CatalogueContent from "../../components/CatalogueContent/CatalogueContent";

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

class Catalogue extends React.Component{
    componentDidMount(){
        this.props.fetchData();
    }

    render(){
        const classes = this.props;
        let catalogue = null;

        console.log("filtered data : ");
        console.log(this.props.filteredData);
        if(this.props.filteredData && this.props.filteredData.length !== undefined){
            catalogue = (
                <CatalogueContent classes={classes}
                                  filteredData={this.props.filteredData}
                                  filterData={this.props.filterData}/>
            );
        }

        return catalogue;
    }
}

const mapStateToProps = state => {
    return {
        filteredData: state.artworks.filteredData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions_artworks.getData()),
        filterData: (event) => dispatch(actions_artworks.filterData(event)),
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Catalogue));


