import React from "react";
import Mosaique from "../Mosaique/Mosaique";
import Tile from "../../components/Tile/Tile";
import "./ApercuModal.css";

import { connect } from "react-redux";
import * as actions_send_data from "../../store/actions/actions_artworks";
import * as actions_modal from "../../store/actions/actions_modal";
import { Button } from "@material-ui/core";

import Web3 from 'web3'
import {abi, addresss, byte_code} from './config'
import { stringify } from 'querystring';


class ApercuModal extends React.Component{
    constructor(props){
        super(props);

        this.tile_margin = 1;
        this.state = {
            tilesArray: [],
            selectedTileId: 0,
            nb_cols: 10,
            nb_rows: 10,
            tile_width: 0,
            tile_height: 0,
        }
    }

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
          })
          .then(this.orderHandler());
      }
    
    getAccount = (account) => {
        this.setState({ account: account });
    };
    changeInputMosaique = (event, keys) => {
        const val = Math.max(event.target.value, 5);

        this.setState((prevState, props) => {
            return {
                ...prevState,
                [keys.division]: val,
                ["tile_" + keys.dimension]: props["original_" + keys.dimension] / val
            };
        }, () => {
            this.generateTiles();
        });
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

    selectTile = (tile) => {
        this.setState({
            ...this.state,
            selectedTileId: tile.id
        });

        console.log("Col : " + tile.col + " Row : " + tile.row);
    };

    setTileDimensions = () => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                tile_width: Math.min(800, props.original_width) / prevState.nb_cols,
                tile_height: props.original_height / prevState.nb_rows
            };
        });
    };

    orderHandler = () => {
        const formData = {
            name: this.props.name,
            description: this.props.description,
            price: this.props.price
        };

        this.props.sendData(formData);
        this.props.closeModal();
    };

    componentDidMount(){
        this.generateTiles();
        this.setTileDimensions();
    }

    render(){
        let imagePreview = null;
        let containerWidth = 0;

        if(this.props.uploadedImage) {
            containerWidth = this.props.original_width + 2 * this.state.nb_cols * this.tile_margin + "px";

            imagePreview = this.state.tilesArray.map(tile => {
                const tileClass = this.state.selectedTileId === tile.id
                    ? "tile selected"
                    : "tile";

                return (
                    <Tile key={tile.id} index={tile.id} tile={tile} tileClass={tileClass}
                          tile_height={this.state.tile_height} tile_width={this.state.tile_width}
                          tile_margin={this.tile_margin} selectTile={this.selectTile}
                          uploadedImage={this.props.uploadedImage}/>
                );
            });
        }

        return (
            <>
                <h3 className={"apercuModalTitle"}>Informations sur votre oeuvre : </h3>
                <div>
                    <label>Nom de l'oeuvre : </label> {this.props.name}
                </div>
                <div>
                    <label>Description de l'oeuvre : </label> {this.props.description}
                </div>
                <div>
                    <label>Prix des subdivisions : </label> {this.props.price}
                </div>

                <hr/>

                <h3 className={"apercuModalTitle"}>Modifier le nombre de subdivisions de votre oeuvre : </h3>
                <label>NB COLS</label>
                <input type="number" value={this.state.nb_cols} style={{marginLeft: "10px"}}
                       min={5} max={20} onChange={(event) => this.changeInputMosaique(event, {
                           division: "nb_cols",
                           dimension: "width"
                       })}/>
                <br/>
                <label>NB ROWS</label>
                <input type="number" value={this.state.nb_rows} style={{marginLeft: "10px"}}
                       min={5} max={20} onChange={(event) => this.changeInputMosaique(event, {
                           division: "nb_rows",
                           dimension: "height"
                       })}/>
                <br/><br/>
                <Mosaique uploadedImage={this.props.uploadedImage} tilesArray={this.state.tilesArray}
                          selectTileId={this.selectTile} selectedTileId={this.state.selectedTileId}
                          tile_height={this.state.tile_height} tile_width={this.state.tile_width}
                          tile_margin={this.tile_margin} containerWidth={containerWidth}
                          imagePreview={imagePreview}/>
                <button onClick={() => this.DeployContract(parseInt(this.props.price),"hash","Auteur","nom_oeuvre",10)}>deploy</button>
                
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        uploadedImage: state.upload.uploadedImage,
        original_width: state.upload.original_width,
        original_height: state.upload.original_height,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendData: (formData) => dispatch(actions_send_data.sendData(formData)),
        closeModal: () => dispatch(actions_modal.closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApercuModal);