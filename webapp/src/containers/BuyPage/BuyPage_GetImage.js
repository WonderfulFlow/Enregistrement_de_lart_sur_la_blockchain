import React from "react";
import Mosaique from "../Mosaique/Mosaique";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import BuyPage from "../../components/BuyPage/BuyPage";
import { Button } from "@material-ui/core";
import Web3 from "web3";
import { abi } from "../UploadForm/config";
import URL from "../../menduni_config";

class BuyPage_GetImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesArray: [],
            selectedTiles: [],
            account: null,
            contract: null,
        };

        this.buy = this.buy.bind(this);
        this.show = this.show.bind(this);
        // this.checkTokenOwner = this.checkTokenOwner.bind(this);
        this.setUpWeb3 = this.setUpWeb3.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
        // this.checkFreeTiles = this.checkFreeTiles.bind(this);
    }

    async generateTiles(){
        const tiles_array = [],
            nb_rows = this.props.data.nb_rows,
            nb_cols = this.props.data.nb_cols;
        let id = 1;

        for(let i = 0; i < nb_rows; i++){
            for(let j = 0; j < nb_cols; j++){
                tiles_array.push({
                    id: id,
                    col: j,
                    row: i,
                });

                id += 1;
            }
        }

        this.setState({
            tilesArray: [...tiles_array]
        });
    };

    selectTile = (tile) => {
        const check = this.state.selectedTiles.includes(tile.id);
        let selectedTiles;

        if(check){
            selectedTiles = this.state.selectedTiles.filter(id => id !== tile.id);
        } else {
            selectedTiles = [...this.state.selectedTiles, tile.id];
        }

        this.setState({  selectedTiles: selectedTiles });
    };

    // async checkTokenOwner(tile_id){
    //     const tokenOwner = await contract.methods.ownerOf(tile_id);
    // }
    //
    // checkFreeTiles = () => {
    //     this.state.tilesArray.forEach(this.checkTokenOwner(tile_id))
    // };

    async buy(tileID){
        const address = this.props.data.contract_address;
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abi, address);

        contract.methods.purchaseToken(tileID)
            .send({
                from: accounts[0],
                gas: 3000000,
                value: (this.props.data.price)
            });
    }

    async show(){
        const address=this.props.data.contract_address;
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abi, address);

        // accounts[0] ===
        contract.methods.balanceOf(accounts[0]).call().then(alert);
    }

    buyTiles = () => {
        this.state.selectedTiles.forEach(tileID => this.buy(tileID));
    };

    onChange = (value, variable) => {
        this.setState({
            [variable]: value
        });
    };

    async setUpWeb3(){
        const address = this.props.data.contract_address;
        await window.ethereum.enable();
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abi, address);

        this.setState({
            account: accounts[0],
            contract: contract,
        });
    }

    componentDidMount() {
        this.setUpWeb3()
            .then(this.generateTiles);
    }

    render(){

        const imagePreview = <ImagePreview tilesArray={this.state.tilesArray}
                                           selectedTiles={this.state.selectedTiles}
                                           tile_height={this.props.data.tile_height}
                                           tile_width={this.props.data.tile_width}
                                           selectTile={this.selectTile}
                                           contract={this.state.contract}
                                           account={this.state.account}
                                           buyPage={true}
                                           uploadedImage={URL + "/api/image/" + this.props.data.id}/>;

        const containerWidth = this.props.data.nb_cols * this.props.data.tile_width + 2 * this.props.data.nb_cols + 2 + "px";

        const mosaique = (
            <div className={"contenuModal BuyPage_GetImage"}>
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
        buttonContent += " pour " + nbTiles * (this.props.data.price/1000000000000000000) + " eth";

        let actionButton;
        if(nbTiles === 0){
            actionButton = (
                <>
                    <Button size="small"
                            color="primary"
                            onClick={this.buyTiles}
                            disabled>
                        { buttonContent }
                    </Button>
                    <Button size="small"
                            color="primary"
                            onClick={this.show}>
                        Show owned tokens
                    </Button>
            </>
            );
        } else {
            actionButton = (
                <>
                    <Button size="small"
                            color="primary"
                            onClick={this.buyTiles}>
                        { buttonContent }
                    </Button>
                    <Button size="small"
                            color="primary"
                            onClick={this.show}>
                        Show owned tokens
                    </Button>
                </>
            )
        }

        const dataWidth = this.props.data.original_width + 2 * (this.props.data.nb_cols + 1);
        const cardSize = dataWidth < 600
            ? "sm"
            : dataWidth < 960
                ? "md"
                : dataWidth < 1280
                    ? "lg"
                    : "xl";

        const buyPage = (
            <BuyPage classes={this.props.classes}
                     data={this.props.data}
                     cardSize={cardSize}
                     actionButton={actionButton}>
                {mosaique}
            </BuyPage>
        );

        return buyPage;
    }
}

export default BuyPage_GetImage;