import React from 'react';
import background from '../../img/background.png';
import Mosaique from '../Mosaique/Mosaique';
import HomeBody from '../../components/HomeBody/HomeBody';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import { connect } from 'react-redux';
import {CssBaseline, withStyles} from '@material-ui/core';
import Web3 from "web3";

const useStyles = theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: "url(" + background + ")",
        padding: theme.spacing(8, 0, 6)
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

class Album extends React.Component{
    constructor(props){
        super(props);
        this.tile_margin = 1;

        this.state = {
            network: "",
            account: "",
            lastBlock: "",

            nb_rows: 10,
            nb_cols: 10,
            original_height: 0,
            original_width: 0,
            tile_height: 0,
            tile_width: 0,
            selectedTileId: null,
            uploadedImage: null,
            tilesArray: [],
        };

        this.selectTile = this.selectTile.bind(this);
        this.loadBlockchainData = this.loadBlockchainData.bind(this);
    }

    async loadBlockchainData(){
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
        const lastBlock = await web3.eth.getBlock('latest');

        this.setState({
            ...this.state,
            network: network,
            account: accounts[0],
            lastBlock: lastBlock.number
        });
    }

    changeInputMosaique = (event, keys) => {
        const val = Math.max(event.target.value, 5);

        this.setState(prevState => {
            return {
                ...prevState,
                [keys.division]: val,
                ["tile_" + keys.dimension]: prevState["original_" + keys.dimension] / val
            };
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
                                    original_height: response.height,
                                    original_width: response.width,
                                    tile_height: response.height / this.state.nb_rows,
                                    tile_width: response.width / this.state.nb_cols,
                                });
                            });
                    });
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
        this.loadBlockchainData();
        this.generateTiles();
    }

    render(){
        const { classes } = this.props;
        const mosaique = <Mosaique uploadedImage={this.state.uploadedImage}
                                   tilesArray={this.state.tilesArray}
                                   selectedTilesId={this.state.selectedTileId}
                                   original_width={this.state.original_width}
                                   nb_cols={this.state.nb_cols}
                                   tile_margin={this.tile_margin}
                                   tile_width={this.state.tile_width}
                                   tile_height={this.state.tile_height}
                                   selectTile={this.selectTile}
                                    />;

        return (
            <>
                <CssBaseline />
                <HomeBody heroContent={classes.heroContent}
                          network={this.state.network}
                          account={this.state.account}
                          lastBlock={this.state.lastBlock}
                          uploadImage={this.uploadImage}
                          changeInputMosaique={this.changeInputMosaique}
                          valueNbCols={this.state.nb_cols}
                          valueNbRows={this.state.nb_rows}>
                    {mosaique}
                </HomeBody>
                <Footer footerClass={classes.footer}/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Album));