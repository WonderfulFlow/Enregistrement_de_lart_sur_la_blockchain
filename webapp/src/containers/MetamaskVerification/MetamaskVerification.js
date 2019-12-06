import React from "react";
import Web3 from "web3";

import { Redirect } from "react-router-dom";
import * as routes from "../../routes";
import {withMobileDialog} from "@material-ui/core";

class MetamaskVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            network: null,
            account: null,
            lastBlock: 0,
            mounted: false
        };
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
        this.test = this.test.bind(this);
    }

    async loadBlockchainData(){
    //     let network = null, account = null, lastBlock_number = null;
    //
    //     try {
    //         console.log("ici2");
    //         await window.ethereum.enable();
    //         console.log("ici1");
    //         const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    //         network = await web3.eth.net.getNetworkType();
    //         account = await web3.eth.getAccounts()[0];
    //         lastBlock_number = await web3.eth.getBlock('latest').number;
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         alert("finally");
    //         this.setState({
    //             ...this.state,
    //             network: network,
    //             account: account,
    //             lastBlock_number: lastBlock_number,
    //             mounted: true,
    //         });
    //     }
    //
    //     console.log("try fini");
    }

    async test(){
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */});
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    // async test(){
    //     let web3 = new Web3(Web3.givenProvider);
    //     let lastBlock_number = null;
    //
    //     try {
    //         console.log("[test] try");
    //         if (typeof web3 !== 'undefined') {
    //             console.log("Metamask OK");
    //             web3 = new Web3(web3.currentProvider);
    //         } else {
    //             console.log("Metamask NOT OK");
    //             web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //         }
    //
    //         web3.eth.getBlock('latest')
    //             .then(response => {
    //                 lastBlock_number = response.number;
    //
    //                 this.setState({
    //                     mounted: true,
    //                     lastBlock: lastBlock_number,
    //                     network: 1
    //                 });
    //             })
    //             .catch(error =>
    //                 console.log(error)
    //             );
    //
    //     } catch(e) {
    //         console.log("[test] catch");
    //         console.log(e);
    //         this.setState({
    //             mounted: true,
    //         }, () => {
    //             console.log(this.state.mounted);
    //             console.log(this.state.network)
    //         })
    //     }
    // }

    componentDidMount() {
        // this.loadBlockchainData();
        this.test();
    }

    render(){
        console.log("[Render]");
        let res = null;
        if(this.state.mounted && !this.state.network){
            res = <Redirect to={routes.NO_METAMASK}/>;
            console.log("redirect");
        }

        return res;
    }
}

export default MetamaskVerification;