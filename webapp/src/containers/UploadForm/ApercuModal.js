import React from "react";
import Mosaique from "../Mosaique/Mosaique";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import "./ApercuModal.css";

import { connect } from "react-redux";
import * as actions_artworks from "../../store/actions/actions_artworks";
import * as actions_modal from "../../store/actions/actions_modal";

import Web3 from 'web3'
import { abi, address, byte_code } from './config'
import { stringify } from 'querystring';

class ApercuModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tilesArray: [],
            nb_cols: 10,
            nb_rows: 10,
            tile_width: 0,
            tile_height: 0,
        }
    }

    async DeployContract (price, hash, nom_auteur, nom_oeuvre, supply) {
        await window.ethereum.enable();
        
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const myContract = new web3.eth.Contract(abi, address);

        alert(supply);
        myContract.deploy({
            data : byte_code,
            arguments : [price, stringify(hash), stringify(nom_auteur), stringify(nom_oeuvre), supply]
        })
            .send({
                from: accounts[0],
                gasPrice: '20000000000'
            })
            .then(newContractInstance => {
                alert("DeployContract");
                console.log(newContractInstance.options.address);
                this.orderHandler(newContractInstance.options.address);
            }) // instance with the new contract address
    }

    changeInputMosaique = (event, keys) => {
        const val = Math.max(event.target.value, 5);

        this.setState((prevState, props) => {
            return {
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

        this.setState({ tilesArray: [...tiles_array] });
    };

    setTileDimensions = () => {
        this.setState((prevState, props) => {
            return {
                tile_width: props.original_width / prevState.nb_cols,
                tile_height: props.original_height / prevState.nb_rows
            };
        });
    };

    orderHandler = (contract_address) => {
        alert("orderHandler");
        const formData = {
            contract_address: contract_address,
            artiste : this.props.artiste,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
            nb_rows: this.state.nb_rows,
            nb_cols: this.state.nb_cols,
            original_width: this.state.original_width,
            tile_height: this.state.tile_height,
            tile_width: this.state.tile_width,
        };

        this.props.sendData(formData);
        this.props.closeModal();
    };

    componentDidMount(){
        this.generateTiles();
        this.setTileDimensions();
    }

    render(){
        let imagePreview = null,
            containerWidth = 0;

        if(this.props.uploadedImage) {
            containerWidth = this.props.original_width + 2 * this.state.nb_cols + "px";

            imagePreview = <ImagePreview tilesArray={this.state.tilesArray}
                                         tile_height={this.state.tile_height}
                                         tile_width={this.state.tile_width}
                                         uploadedImage={this.props.uploadedImage}/>
        }

        return (
            <div className={"contenuModal"}>
                <h3>Informations sur votre oeuvre : </h3>
                <div>
                    <label>Nom de l'artiste : </label> {this.props.artiste}
                </div>
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

                <h3>Modifier le nombre de subdivisions de votre oeuvre : </h3>
                <label>NB COLS</label>
                <input type="number"
                       value={this.state.nb_cols}
                       min={5} max={20}
                       onChange={(event) => this.changeInputMosaique(event, {
                           division: "nb_cols",
                           dimension: "width"
                       })}/>
                <br/>
                <label>NB ROWS</label>
                <input type="number"
                       value={this.state.nb_rows}
                       min={5} max={20}
                       onChange={(event) => this.changeInputMosaique(event, {
                           division: "nb_rows",
                           dimension: "height"
                       })}/>
                <br/><br/>
                <Mosaique containerWidth={containerWidth}
                          imagePreview={imagePreview}/>
                <br/><br/>
                <button onClick={() => this.DeployContract(parseInt(this.props.price),"hash", this.props.artiste,
                    this.state.name, this.state.nb_cols * this.state.nb_rows)}>
                    deploy
                </button>
            </div>
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
        sendData: (formData) => dispatch(actions_artworks.sendData(formData)),
        closeModal: () => dispatch(actions_modal.closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApercuModal);