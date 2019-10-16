import React from 'react';
import background from '../../img/background.png';
import AppBar from '../../components/AppBar/AppBar';
import HomeBody from '../../components/HomeBody/HomeBody';
import Footer from '../../components/Footer/Footer';

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
        this.tile_height = 0;
        this.tile_width = 0;

        this.state = {
            nb_rows: 10,
            nb_cols: 10,
            width: 0,
            selectedTileId: null,
            uploadedImage: null,
            tilesArray: [],
        };

        this.generateTiles = this.generateTiles.bind(this);
        this.showTile = this.showTile.bind(this);
    }

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
                                this.tile_height = response.height / this.state.nb_rows;
                                this.tile_width = response.width / this.state.nb_cols;
                                console.log(this.tile_height,this.tile_width)

                                this.setState({
                                    ...this.state,
                                    uploadedImage: base64,
                                    width: response.width
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

        for(let i = 0; i < this.state.nb_cols; i++){
            for(let j = 0; j < this.state.nb_rows; j++){
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
    showTile(tile){
        console.log(tile);
    }

    componentDidMount(){
        this.generateTiles();
    }

    render(){
        const { classes } = this.props;

        // On affiche la preview que lorsqu'une image a été uploadée.
        let imagePreview = null;
        let containerWidth = 0;
        if(this.state.uploadedImage){
            containerWidth = this.state.width + this.state.nb_cols * 4 + "px";

            imagePreview = this.state.tilesArray.map((tile, index) => {
                let className = this.state.selectedTileId === tile.id
                                ? "tile selected"
                                : "tile";

                return (
                    <div key={index} className={className}
                         style={{width: this.tile_width, height: this.tile_height}}
                         onClick={() => this.showTile(tile)}>
                        <img key={index} src={this.state.uploadedImage} alt={"Upload preview"}
                            style={{ position: "relative",
                                     top: "-" + this.tile_height * tile.row + "px",
                                     left: "-" + this.tile_width * tile.col + "px"
                            }}/>
                    </div>
                    
                )
            })
        }

        return (
            <>
                <CssBaseline />
                <AppBar icon={classes.icon}/>
                <HomeBody heroContent={classes.heroContent}
                          network={this.props.network}
                          account={this.props.account}
                          lastBlock={this.props.lastBlock}
                          uploadImage={this.uploadImage}
                          imagePreview={imagePreview}
                          containerWidth={containerWidth}/>
                <Footer footerClass={classes.footer}/>
            </>
        );
    }
}

export default withStyles(useStyles)(Album);