import React from "react";
import Tile from "../../containers/Tile/Tile";

const imagePreview = (props) => {
    return props.tilesArray.map(tile => {
        let tileClass = "tile";
        if(props.selectedTiles && props.selectedTiles.includes(tile.id))
            tileClass += " selected";

        return (
            <Tile key={tile.id}
                  tile={tile}
                  tileClass={tileClass}
                  tile_height={props.tile_height}
                  tile_width={props.tile_width}
                  selectTile={props.selectTile}
                  account={props.account}
                  contract={props.contract}
                  uploadedImage={props.uploadedImage}/>
        );
    });
};



export default imagePreview;

