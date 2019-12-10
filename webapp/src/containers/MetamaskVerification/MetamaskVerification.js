import React from "react";
import Web3 from "web3";
import Modal from "../../hoc/Modal/Modal";
import ErrorMetamaskConnection from "../../components/Errors/ErrorMetamaskConnection";

import { Redirect } from "react-router-dom";
import * as routes from "../../routes";
import { connect } from "react-redux";
import * as actions_modal_error from "../../store/actions/actions_modal_error";

class MetamaskVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            network: null,
            account: null,
            lastBlock: 0,
            no_metamask: false,
            no_metamask_connection: true,
        };
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
        this.getMetamaskUserData = this.getMetamaskUserData.bind(this);
        this.test = this.test.bind(this);
    }

    async loadBlockchainData(){
        let network = null, account = null, lastBlock = null;

        try {
            await window.ethereum.enable();
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            network = await web3.eth.net.getNetworkType();
            account = await web3.eth.getAccounts()[0];
            lastBlock = await web3.eth.getBlock('latest').number;
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                ...this.state,
                network: network,
                account: account,
                lastBlock: lastBlock,
                mounted: true,
            });
            this.props.getaccount(account)
        }
    }

    async getMetamaskUserData(web3){
        let network, accounts, lastBlock;

        network = await web3.eth.net.getNetworkType();
        accounts = await web3.eth.getAccounts();
        lastBlock = await web3.eth.getBlock('latest');
        lastBlock = lastBlock.number;

        console.log(network);
        console.log(accounts[0]);
        console.log(lastBlock);
        this.setState({
            network: network,
            account: accounts[0],
            lastBlock: lastBlock,
            no_metamask_connection: false,
        });
    }

    async test(){
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(() => this.getMetamaskUserData(web3));
            } catch(e) {
                alert("Une erreur est survenue. Veuillez réessayer plus tard.");
                console.log(e);
            }
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            this.getMetamaskUserData(web3);
        } else {
            this.setState({ no_metamask: true });
        }
    }

    componentDidMount(){
        this.test();
    }

    render(){
        let res = null;
        if(this.state.no_metamask){
            res = <Redirect to={routes.NO_METAMASK}/>;
        } else if (this.state.no_metamask_connection){
            this.props.openErrorModal();
            res = <ErrorMetamaskConnection/>;
        } else {
            this.props.closeErrorModal();
        }

        return (
            <Modal isOpen={this.props.modalErrorOpen}>
                {res}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        modalErrorOpen: state.modal_error.modalErrorOpen,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openErrorModal: () => dispatch(actions_modal_error.openErrorModal()),
        closeErrorModal: () => dispatch(actions_modal_error.closeErrorModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetamaskVerification);