import React from "react";
import Tile from "../Tile/Tile";

const imagePreview = (props) => {
    return props.tilesArray.map(tile => {
        const tileClass = props.selectedTiles.includes(tile.id)
            ? "tile selected"
            : "tile";

        return (
            <Tile key={tile.id}
                  index={tile.id}
                  tile={tile}
                  tileClass={tileClass}
                  tile_height={props.tile_height}
                  tile_width={props.tile_width}
                  selectTile={props.selectTile}
                  uploadedImage={props.uploadedImage}/>
        );
    });
};

export default imagePreview;

