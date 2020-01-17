import React from "react";
import Tile from "../Tile/Tile";

const imagePreview = (props) => {
    return props.tilesArray.map(tile => {
        let tileClass = "tile";
        if(props.selectedTiles && props.selectedTiles.includes(tile.id))
            tileClass += " selected";

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

