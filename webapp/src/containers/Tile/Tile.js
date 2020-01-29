import React from "react";
import TileContent from "../../components/Tile/Tile";

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tileStatus: null,
        };

        this.isTileOwned = this.isTileOwned.bind(this);
    }

    async isTileOwned(){
        let tileStatus = null;

        this.props.contract.methods.ownerOf(this.props.tile.id)
                    .call()
                    .then(ownerAddress => {
                        tileStatus = ownerAddress === this.props.account
                            ? "owner"
                            : "sold";

                        this.setState({ tileStatus: tileStatus });
                    })


    }

    componentDidMount() {
        if(this.props.buyPage)
            this.isTileOwned();
    }

    render(){
        const tileClass = this.state.tileStatus
                                ? this.props.tileClass.concat(" " + this.state.tileStatus)
                                : this.props.tileClass;

        const selectTile = this.state.tileStatus === null
                                ? this.props.selectTile
                                : null;

        return (
            <TileContent key={this.props.tile.id}
                          data_id={this.props.data_id}
                          tile={this.props.tile}
                          tileClass={tileClass}
                          tile_height={this.props.tile_height}
                          tile_width={this.props.tile_width}
                          selectTile={selectTile}
                          tileStatus={this.state.tileStatus}
                          uploadedImage={this.props.uploadedImage}/>
        );
    }
}

export default Tile;