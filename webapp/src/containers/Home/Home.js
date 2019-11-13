import React from 'react';
import background from '../../img/background.png';
import AppBar from '../../components/AppBar/AppBar';
import HomeBody from '../../components/HomeBody/HomeBody';
import Mosaique from '../Mosaique/Mosaique';
import Footer from '../../components/Footer/Footer';

import Web3 from 'web3';
import { artblockchain2_ABI, artblockchain2_ADRESS } from '../../config'


import './Home.css';
import {CssBaseline, withStyles} from '@material-ui/core';

const useStyles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
        width: '75px'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: "url(" + background + ")",
        padding: theme.spacing(8, 0, 6)
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
})  ;

class Album extends React.Component{
    constructor(props){
        super(props);
        this.margin = 1;

        this.state = {
            nb_rows: 10,
            nb_cols: 10,
            height: 0,
            width: 0,
            tile_height: 0,
            tile_width: 0,
            selectedTileId: null,
            uploadedImage: null,
            tilesArray: [],
            smart_contract: null,
            nb_oeuvres: null,

            token_id: 0,
        };

        this.getAddress= this.getAddress.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
        this.selectTile = this.selectTile.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
    }

    onChange_Token_Id = (event) => {
        this.setState({
            ...this.state,
            token_id: event.target.value
        });
    }

    async loadBlockchainData() {
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const smart_contract = new web3.eth.Contract( artblockchain2_ABI, artblockchain2_ADRESS)
        this.setState({
            ...this.state,
            smart_contract: smart_contract 
        });
        
       
      }

    async getAddress(val){
        let nb_oeuvres = await this.state.smart_contract.methods.ownerOf(val).call()// calls the function ownerOf the 1st token 
        this.setState({ 
            ...this.state,
            nb_oeuvres: nb_oeuvres 
        });
    }
    
    changeNbCols = (event) => {
        const nb_cols = Math.max(event.target.value, 5);

        this.setState({
            ...this.state,
            nb_cols: nb_cols,
            tile_width: this.state.width / nb_cols
        }, () => {
            this.generateTiles();
        });
    };

    changeNbRows = (event) => {
        const nb_rows = Math.max(event.target.value, 5);

        this.setState({
            ...this.state,
            nb_rows: nb_rows,
            tile_height: this.state.height / nb_rows
        }, () => {
            this.generateTiles();
        });
    };

    // Vérifie si le fichier envoyé est conforme.
    checkFileValidity = (event) => {
        const files = event.target.files;

        return (files[0] && files.length === 1 && files[0].name.match(/.(jpg|jpeg|png|gif)$/i));
    };

    // Récupère l'image de l'input
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Récupère les dimensions de l'image
    getImageDimensions = (file) => {
        return new Promise (function (resolved, rejected) {
            const i = new Image();
            i.onload = function(){
                resolved({
                    width: i.width,
                    height: i.height
                })
            };
            i.src = file
            console.log(i.width,i.height) //good
        })
    };

    // Stocke l'image dans le state
    uploadImage = (event) => {
        if(event.target.files.length !== 0){
            if(this.checkFileValidity(event)){
                this.getBase64(event.target.files[0])
                    .then(base64 => {
                        this.getImageDimensions(base64)
                            .then(response => {
                                this.setState({
                                    ...this.state,
                                    uploadedImage: base64,
                                    height: response.height,
                                    width: response.width,
                                    tile_height: response.height / this.state.nb_rows,
                                    tile_width: response.width / this.state.nb_cols,
                                });
                            });
                    });
                    // uploadedImage: event.target.files[0] //APRES : QUAND ON FERA LE BACKEND
            } else {
                alert("Vous ne pouvez pas envoyer plusieurs fichiers.");
            }
        }
    };

    // Génère les cases formant la mosaïque
    generateTiles = () => {
        const tiles_array = [];
        let id = 1;

        for(let i = 0; i < this.state.nb_rows; i++){
            for(let j = 0; j < this.state.nb_cols; j++){
                tiles_array.push({
                    id: id,
                    col: j,
                    row: i,
                });

                id += 1;
            }
        }

        this.setState({
            ...this.state,
            tilesArray: [...tiles_array]
        });
    };

    //Ici on va vérifier qu'on peut récupérer les données d'une case qu'on enverra dans un formulaire lorsque
    //l'utilisateur valider sa commande.
    selectTile(tile){
        this.setState({
            ...this.state,
            selectedTileId: tile.id
        });

        console.log("Col : " + tile.col + " Row : " + tile.row);

        // alert("Vous souhaitez acheter la portion de l'oeuvre ayant pour ID : " + tile.id);
    }

    componentDidMount(){
        this.generateTiles();
        this.loadBlockchainData();
    }

    render(){
        const { classes } = this.props;
        const mosaique = <Mosaique uploadedImage={this.state.uploadedImage}
                                   tilesArray={this.state.tilesArray}
                                   selectedTilesId={this.state.selectedTileId}
                                   width={this.state.width}
                                   nb_cols={this.state.nb_cols}
                                   margin={this.margin}
                                   tile_width={this.state.tile_width}
                                   tile_height={this.state.tile_height}
                                   selectTile={this.selectTile}
                                    />;

        if(this.state.smart_contract){
            this.getAddress(this.state.token_id);
        }
        
        return (
            <>
                <CssBaseline />
                <AppBar icon={classes.icon}/>
                <HomeBody heroContent={classes.heroContent}
                          network={this.props.network}
                          account={this.props.account}
                          nb_oeuvres={this.state.nb_oeuvres}
                          lastBlock={this.props.lastBlock}
                          uploadImage={this.uploadImage}
                          changeNbCols={this.changeNbCols}
                          valueNbCols={this.state.nb_cols}
                          changeNbRows={this.changeNbRows}
                          valueNbRows={this.state.nb_rows}
                          onChange_Token_Id={this.onChange_Token_Id}>
                    {mosaique}
                </HomeBody>
                <Footer footerClass={classes.footer}/>
            </>
        );
    }
}

export default withStyles(useStyles)(Album);