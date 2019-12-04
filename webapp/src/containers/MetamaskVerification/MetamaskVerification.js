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
        let web3 = new Web3(Web3.givenProvider);
        let lastBlock_number = null;

        try {
            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
            } else {
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            }

            web3.eth.getBlock('latest')
                .then(response => {
                    lastBlock_number = response.number;

                    this.setState({
                        mounted: true,
                        lastBlock: lastBlock_number,
                        network: 1
                    }, () => console.log(this.state.lastBlock))
                })
                .catch(error =>
                    console.log(error)
                );



        } catch(e) {
            console.log(e);
        } finally {
            this.setState({
                mounted: true,
            });
        }




    }

    componentDidMount() {
        // this.loadBlockchainData();
        this.test();
    }

    render(){
        let res = null;
        if(this.state.mounted && !this.state.network){
            res = <Redirect to={routes.NO_METAMASK}/>;
            console.log("redirect");
        }

        return res;
    }
}

export default MetamaskVerification;