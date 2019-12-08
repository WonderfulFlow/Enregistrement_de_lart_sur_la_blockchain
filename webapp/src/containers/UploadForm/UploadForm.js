import React from 'react';
import HeadSection from "../../components/HeadSection/HeadSection";
import Form from "../../components/Form/Form";
import Modal from "../../hoc/Modal/Modal";
import ApercuModal from "./ApercuModal";
import MetamaskVerification from "../MetamaskVerification/MetamaskVerification";

import { Container, makeStyles, withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions_upload from "../../store/actions/actions_upload";
import * as actions_modal from "../../store/actions/actions_modal";

import Web3 from 'web3'
import {abi, addresss, byte_code} from './config'
import { stringify } from 'querystring';


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

        if(this.checkFormNameValidity() && this.checkFormDescriptionValidity() &&
            this.checkFormPriceValidity() && this.checkFormImageValidity()){
            check = true;
        }

        return check;
    };

    async DeployContract (price, hash, nom_auteur, nom_oeuvre,supply) {
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        const myContract = new web3.eth.Contract(abi,addresss);
        myContract.deploy({
          data : byte_code,
          arguments : [price,stringify(hash),stringify(nom_auteur),stringify(nom_oeuvre),supply]
        }).send({
            from: accounts[0],
            gasPrice: '20000000000'
          })
          .then(function(newContractInstance){
              console.log(newContractInstance.options.address) // instance with the new contract address
          });
      }
    
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

                    <button onClick={() => this.DeployContract(3,"bonjour","bonjour","bonjour",3)}>deploy</button>

                    <Form openMosaique={this.openMosaique} onChange={this.onChange} uploadImage={this.props.uploadImage}/>

                    <Modal isOpen={this.props.modalOpen} closeModal={this.props.closeModal}
                           original_width={this.props.original_width}>
                        <ApercuModal name={this.state.name} description={this.state.description}
                                    price={this.state.price}/>
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