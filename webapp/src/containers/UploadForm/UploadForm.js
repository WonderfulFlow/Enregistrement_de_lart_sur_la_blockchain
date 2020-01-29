import React from 'react';
import "./UploadForm.css";
import HeadSection from "../../components/HeadSection/HeadSection";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import Modal from "../../hoc/Modal/Modal";
import ApercuModal from "./ApercuModal";
import MetamaskVerification from "../MetamaskVerification/MetamaskVerification";

import { Container, makeStyles, withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions_upload from "../../store/actions/actions_upload";
import * as actions_modal from "../../store/actions/actions_modal";

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
            artiste: "",
            name: "",
            description: "",
            price: 0,

            account: null,
            
            modalOpen: false,
            tileHeight: 0,
            tileWidth: 0,
        };
    }

    onChange = (value, variable) => {
        this.setState({
            [variable]: value
        });
    };

    checkFormArtisteValidity = () => {
        let check = true;
        // faire trycatch

        if(typeof(this.state.artiste) !== "string")
            check = false;
        else if(this.state.artiste.length < 1  || this.state.artiste.length > 20)
            check = false;

        return check;
    };

    checkFormNameValidity = () => {
        let check = true;
        // faire trycatch

        if(typeof(this.state.name) !== "string")
            check = false;
        else if(this.state.name.length < 1  || this.state.name.length > 20)
            check = false;

        return check;
    };

    checkFormDescriptionValidity = () => {
        let check = true;
        // faire trycatch

        if(typeof(this.state.description) !== "string")
            check = false;
        else if(this.state.description.length < 2  || this.state.description.length > 500)
            check = false;

        return check;
    };

    checkFormPriceValidity = () => {
        let check = true;
        // faire trycatch

        if(isNaN(this.state.price) || parseInt(this.state.price) < 0)
            check = false;

        return check;
    };
   
    checkFormImageValidity = () => {
        let check = true;

        if(!this.props.uploadedImage) check = false;

        return check;
    };

    checkFormValidity = () => {
        let check = false;

        if(this.checkFormArtisteValidity() && this.checkFormNameValidity() &&
            this.checkFormDescriptionValidity() && this.checkFormPriceValidity() && this.checkFormImageValidity()){
            check = true;
        }

        return check;
    };
    
    getAccount = (account) => {
        this.setState({ account: account });
    };

    openMosaique = () => {
        if(this.checkFormValidity()){
            this.props.openModal();
        } else {
            alert("Veuillez remplir tous les champs du formulaire.");
        }
    };

    render(){
        return (
            <div>
                <MetamaskVerification getaccount={this.getAccount}/>
                <Container maxWidth="md">
                    <HeadSection title={"Mettez en vente vos oeuvres !"}
                                 subtitle={"Vos oeuvres peuvent être découpées en morceaux et chacun d'entre eux mis " +
                                            "en vente. Il est alors possible d'acheter et d'être le propriétaire de " +
                                            "parties de votre oeuvre."}/>

                    <Form openMosaique={this.openMosaique}
                          onChange={this.onChange}
                          uploadImage={this.props.uploadImage}/>

                    <Modal className={"ModalTest"}
                           isOpen={this.props.modalOpen}
                           closeModal={this.props.closeModal}
                           original_width={this.props.original_width}>
                        <ApercuModal artiste={this.state.artiste}
                                     name={this.state.name}
                                     description={this.state.description}
                                     price={this.state.price}/>
                    </Modal>
                </Container>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.upload.loading,
        error: state.upload.error,
        uploadedImage: state.upload.uploadedImage,
        original_width: state.upload.original_width,
        modalOpen: state.modal.modalOpen,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        uploadImage: (event) => dispatch(actions_upload.uploadImage(event)),
        openModal: () => dispatch(actions_modal.openModal()),
        closeModal: () => dispatch(actions_modal.closeModal()),

    }
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(UploadForm));