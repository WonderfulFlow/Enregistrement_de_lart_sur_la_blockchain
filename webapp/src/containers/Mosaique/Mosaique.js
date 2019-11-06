import React from 'react';
import Tile from '../../components/Tile/Tile';

class Mosaique extends React.Component{
    render(){
        let imagePreview = null;
        let containerWidth = 0;

        if(this.props.uploadedImage) {
            containerWidth = this.props.width + 2 * this.props.nb_cols * this.props.margin + "px";

            imagePreview = this.props.tilesArray.map((tile, index) => {
                const tileClass = this.props.selectedTileId === tile.id
                    ? "tile selected"
                    : "tile";

                return (
                    <Tile key={index}
                          tileClass={tileClass}
                          width={this.props.tile_width}
                          height={this.props.tile_height}
                          margin={this.props.margin}
                          selectTile={this.props.selectTile}
                          uploadedImage={this.props.uploadedImage}
                          tile={tile}
                          tile_height={this.props.tile_height}
                          tile_width={this.props.tile_width}/>
                );
            });
        }

        return (
            <div className={"preview-container"} style={{ width: containerWidth }}>
                {imagePreview}
            </div>
        )
    }
}

export default Mosaique;