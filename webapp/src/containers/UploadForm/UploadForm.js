import React from 'react';
import Form from "../../components/Form/Form";
import Modal from "../Test/Modal";
import ApercuModal from "../Test/ApercuModal";
import MetamaskVerification from "../MetamaskVerification/MetamaskVerification";

import {Typography, Container, makeStyles, withStyles} from '@material-ui/core';
import { connect } from "react-redux";
import * as actions_upload from "../../store/actions/actions_upload";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            price: 0,

            modalOpen: false,
            tileHeight: 0,
            tileWidth: 0,
        };
    }

    onChange = (value, variable) => {
        this.setState({
            ...this.state,
            [variable]: value
        })
    };

    checkFormNameValidity = () => {
        let check = true;
        //check text, pas file
        // faire trycatch

        if(this.state.name.length < 2  || this.state.name.length > 20) check = false;

        return check;
    };

    checkFormDescriptionValidity = () => {
        let check = true;
        //check text, pas file
        // faire trycatch

        if(this.state.description.length < 2  || this.state.description.length > 500) check = false;

        return check;
    };

    checkFormPriceValidity = () => {
        let check = true;
        // faire trycatch

        if(isNaN(this.state.price)) check = false;

        return check;
    };

    checkFormImageValidity = () => {
        let check = true;

        if(!this.props.uploadedImage) check = false;

        return check;
    };

    checkFormValidity = () => {
        let check = false;

        if(this.checkFormNameValidity() && this.checkFormDescriptionValidity() &&
            this.checkFormPriceValidity() && this.checkFormImageValidity()){
            check = true;
        }

        return check;
    };

    render(){
        return (
            <div>
                <MetamaskVerification/>
                <Container maxWidth="md">
                    <br/><br/>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Mettez en vente vos oeuvres !
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis en vente. Il est alors possible d'acheter et d'être le propriétaire de parties de votre oeuvre.
                    </Typography>
                    <br/><hr/><br/>

                    <Form onChange={this.onChange} uploadImage={this.props.uploadImage}/>

                    <Modal original_width={this.props.original_width} checkFormValidity={this.checkFormValidity}>
                        <ApercuModal/>
                    </Modal>
                </Container>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.upload.loading,
        error: state.upload.error,
        original_width: state.upload.original_width
    }
};

const mapDispatchToProps = dispatch => {
    return {
        uploadImage: (event) => dispatch(actions_upload.uploadImage(event))
    }
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(UploadForm));