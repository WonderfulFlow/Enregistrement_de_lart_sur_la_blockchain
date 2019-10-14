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
        this.nb_rows = 10;
        this.nb_cols = 10;
        
        this.state = {
            uploadedImage: null,
            tilesArray: [],
            dimensions: {},
        };
       
       
        this.tile_height=this.state.dimensions.height/this.nb_rows ;
        this.tile_width =this.state.dimensions.width/this.nb_cols ;
        this.onImgLoad = this.onImgLoad.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
        this.showTile = this.showTile.bind(this);
    }

    // gets image height and width 
    onImgLoad({target:img}) {
        this.setState({dimensions:{height:img.offsetHeight,
                                   width:img.offsetWidth}});
        
        console.log(this.state.dimensions);
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

    // Stocke l'image dans le state
    uploadImage= (event) => {
        
        if(this.checkFileValidity(event)){
            this.getBase64(event.target.files[0])
                .then(base64 => {
                    this.setState({
                        uploadedImage: base64
                    }, () => {
                        console.log(this.uploadImage.offsetHeight);
                    })
                });
                // uploadedImage: event.target.files[0] //APRES : QUAND ON FERA LE BACKEND
        } else {
            alert("Vous ne pouvez pas envoyer plusieurs fichiers.");
        }
    };

    // Génère les cases formant la mosaïque
    generateTiles(){
        const tiles_array = [];
        let id = 1;

        for(let i = 0; i < this.nb_rows; i++){
            for(let j = 0; j < this.nb_cols; j++){
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
    }

    //Ici on va vérifier qu'on peut récupérer les données d'une case qu'on enverra dans un formulaire lorsque
    //l'utilisateur valider sa commande.
    showTile(id){
        console.log(id);
    }

    componentDidMount(){
        this.generateTiles();
    }

    render(){
        const { classes } = this.props;

        // On affiche la preview que lorsqu'une image a été uploadée.
        //const {src} = this.props;
     //   const {width, height} = this.state.dimensions;
        let imagePreview = null;
        if(this.state.uploadedImage){
            imagePreview = this.state.tilesArray.map((tile, index) => {
                let className = this.state.selectedTileId === tile.id
                                ? "tile selected"
                                : "tile";

                return (
                    <div key={index} className={className} onClick={() => this.showTile(tile.id)}>
                        <img key={index} onLoad={this.onImgLoad} src={this.state.uploadedImage} alt={"Upload preview"}
                            style={{ position: "relative",
                                     top: "-" + this.tile_height * tile.col + "px",
                                     left: "-" + this.tile_width * tile.row + "px"
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
                          imagePreview={imagePreview}/>
                <Footer footerClass={classes.footer}/>
            </>
        );
    }
}

export default withStyles(useStyles)(Album);