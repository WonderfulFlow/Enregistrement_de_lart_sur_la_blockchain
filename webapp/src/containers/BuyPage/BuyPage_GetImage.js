import React from "react";
import img from "../../img/img_test_artwork.png";
import Mosaique from "../Mosaique/Mosaique";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import BuyPage from "../../components/BuyPage/BuyPage";
import { Button } from "@material-ui/core";

class BuyPage_GetImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesArray: [],
            selectedTiles: [],
        }
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

    componentDidMount() {
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
                <Button size="small"
                        color="primary"
                        disabled>
                    { buttonContent }
                </Button>
            );
        } else {
            actionButton = (
                <Button size="small"
                        color="primary">
                    { buttonContent }
                </Button>
            )
        }

        const buyPage = (
            <BuyPage classes={this.props.classes}
                     data={this.props.data}
                     actionButton={actionButton}
                    >
                {mosaique}
            </BuyPage>
        );

        return buyPage;
    }
}

export default BuyPage_GetImage;