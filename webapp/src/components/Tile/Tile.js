import React from 'react';

const tile = (props) => (
    <div key={props.index} className={props.tileClass}
         style={{width: props.tile_width, height: props.tile_height, margin: props.margin}}
         onClick={() => props.selectTile(tile)}>
        <img key={props.index} src={props.uploadedImage} alt={"Upload preview"}
             style={{
                 position: "relative",
                 top: "-" + props.tile_height * props.tile.row + "px",
                 left: "-" + props.tile_width * props.tile.col + "px"
             }}/>
    </div>
);

export default tile;