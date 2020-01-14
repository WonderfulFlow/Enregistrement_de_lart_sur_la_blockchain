import React from 'react';
import "./Tile.css";

const tile = (props) => (
    <div key={props.index}
         className={props.tileClass}
         style={{
             width: props.tile_width,
             height: props.tile_height
         }}
         onClick={() => props.selectTile(props.tile)}>
        <img key={props.index}
             className={"imgTile"}
             src={props.uploadedImage}
             alt={"Upload preview"}
             style={{
                 top: "-" + props.tile_height * props.tile.row + "px",
                 left: "-" + props.tile_width * props.tile.col + "px"
             }}/>
    </div>
);

export default tile;