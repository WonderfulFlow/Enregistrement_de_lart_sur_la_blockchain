import React from 'react';
import "./Mosaique.css";

const mosaique = (props) => (
    <div className={"preview-container"} style={{ width: props.containerWidth }}>
        {props.imagePreview}
    </div>
);

export default mosaique;