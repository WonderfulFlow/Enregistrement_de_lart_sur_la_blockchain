import React from "react";
import img from "../../img/img_test_artwork.png";
import Mosaique from "../Mosaique/Mosaique";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import BuyPage from "../../components/BuyPage/BuyPage";
import { Button } from "@material-ui/core";
import Web3 from "web3";
import { abi } from "../UploadForm/config";

class BuyPage_GetImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesArray: [],
            selectedTiles: [],
        };

        this.buy = this.buy.bind(this);
        this.show = this.show.bind(this);
    }

    generateTiles = () => {
        const tiles_array = [];
        let id = 1;

        for(let i = 0; i < this.props.data.nb_rows; i++){
            for(let j = 0; j < this.props.data.nb_cols; j++){
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

    selectTile = (tile) => {
        const check = this.state.selectedTiles.includes(tile.id);
        let selectedTiles;

        if(check){
            selectedTiles = this.state.selectedTiles.filter(id => id !== tile.id);
        } else {
            selectedTiles = [...this.state.selectedTiles, tile.id];
        }

        this.setState({
            selectedTiles: selectedTiles
        }, () => console.log(this.state.selectedTiles));
    };

    async buy(){
        const address = this.props.data.contract_address;
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abi, address);

        console.log(this.state.selectedTiles[0]);
        contract.methods.purchaseToken(parseInt(this.state.selectedTiles[0]))
            .send({
                from: accounts[0],
                gas: 3000000,
                value: 1
            })
            .then(console.log);
    }

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

    onChange = (value, variable) => {
        this.setState({
            [variable]: value
        });
    };

    componentDidMount() {
        console.log(this.props.data);
        this.generateTiles();
    }

    render(){
        const imagePreview = <ImagePreview tilesArray={this.state.tilesArray}
                                           selectedTiles={this.state.selectedTiles}
                                           tile_height={this.props.data.tile_height}
                                           tile_width={this.props.data.tile_width}
                                           selectTile={this.selectTile}
                                           uploadedImage={img}/>;

        const containerWidth = this.props.data.original_width + 2 * this.props.data.nb_cols;

        const mosaique = (
            <div style={{border: "1px solid black"}}>
                <Mosaique containerWidth={containerWidth}
                          imagePreview={imagePreview}/>
            </div>
        );

        const nbTiles = this.state.selectedTiles.length;
        let buttonContent = nbTiles === 0
                                ? "Selectionnez les morceaux que vous souhaitez acheter"
                                : nbTiles === 1
                                    ? "Achetez le morceau"
                                    : "Acheter les " + nbTiles + " morceaux";
        buttonContent += " pour " + nbTiles * this.props.data.price + "€";

        let actionButton;
        if(nbTiles === 0){
            actionButton = (
                <>
                    <Button size="small"
                            color="primary"
                            onClick={this.buy}
                            disabled>
                        { buttonContent }
                    </Button>
                    <Button size="small"
                            color="primary"
                            onClick={this.show}>
                        Show tokens
                    </Button>
            </>
            );
        } else {
            actionButton = (
                <>
                    <Button size="small"
                            color="primary"
                            onClick={this.buy}>
                        { buttonContent }
                    </Button>
                    <Button size="small"
                            color="primary"
                            onClick={this.show}>
                        Show tokens
                    </Button>
                </>
            )
        }

        const buyPage = (
            <BuyPage classes={this.props.classes}
                     data={this.props.data}
                     actionButton={actionButton}>
                {mosaique}
            </BuyPage>
        );

        return buyPage;
    }
}

export default BuyPage_GetImage;