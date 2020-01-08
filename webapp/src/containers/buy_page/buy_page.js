import React from "react";
import BuyPage from "../../components/buy_page/buy_page";

import { makeStyles, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions_artworks from "../../store/actions/actions_artworks";
import {abi} from "../../config"
import Web3 from 'web3'


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
        this.state={
            token_id: 0
        };
        this.show=this.show.bind(this);
        this.buy=this.buy.bind(this);
    }

    // componentDidMount(){
    //     this.props.fetchData();
    //
    // }
    
    async show(){
        const address=this.props.data.contract_address;
        console.log(this.props.data.contract_address)
        //if(address!=null ){
       
        await window.ethereum.enable();
      
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract_Address="0xAb44A688F2dE74d4ab20b95Cc3dA534886B8f8B9"; //should be fetched 
        const user = "0x2dEe326bd5b94034F3d7968E4d3a94EED1c3c852" // hard coded account 

        const contract = new web3.eth.Contract(abi, address);
        console.log(accounts[0])

        //var MyContract = new Web3.eth.Contract(abi, address);
        contract.methods.balanceOf(accounts[0]).call()
        .then(alert);}
       /*else{
         window.alert("pas d'adresse pour cette oeurvre")
        }*/
    //}

    async buy(){
      /*  const address=this.props.data.contract_address;
        console.log(this.props.data.contract_address)
        if(address!=null ){*/
        const address=this.props.data.contract_address;
        console.log(this.state.token_id)
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract_Address="0xAb44A688F2dE74d4ab20b95Cc3dA534886B8f8B9";
        const user = "0x2dEe326bd5b94034F3d7968E4d3a94EED1c3c852"
        const ABI= [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_currentPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_image_hash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_author",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_name_of_art",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_supply",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipRenounced",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "nomdoeuvre",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "createur",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "morceau",
                        "type": "uint256"
                    }
                ],
                "name": "logListeOfArt",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "author",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "currentPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "image_hash",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "list_of_art",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "nom_de_l_oeuvre",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "auteur",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "morceau",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name_of_art",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseToken",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "supply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        const contract = new web3.eth.Contract(abi, address);
        //console.log(contract)
        
        //var MyContract = new Web3.eth.Contract(abi, address);
        contract.methods.purchaseToken(parseInt(this.state.token_id)).send({from: accounts[0],gas: 3000000,value:1 })
        .then(console.log);}
       /* else{
            window.alert("pas d'adresse pour cette oeurvre")
        }
  }*/
  
  onChange = (value, variable) => {
    this.setState({
        [variable]: value
    });
}

    componentDidMount() {
        const {match: {params}} = this.props;
        const artwork_id = params.id;
        this.props.fetchData(artwork_id);
        console.log("buy page")
    }

    render(){
        const { classes } = this.props;
        let buyPage = null;
        if(this.props.data){
            buyPage = <BuyPage classes={classes} onChange={this.onChange} data={this.props.data} clicked={this.show} clicking={this.buy} />;
            

        }

        return (
            <>
                  {buyPage}
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
        fetchData: (id) => dispatch(actions_artworks.getData(id)),
    };
};

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Buyingpage));


