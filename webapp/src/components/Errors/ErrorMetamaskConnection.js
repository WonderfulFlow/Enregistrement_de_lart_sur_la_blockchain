import React from 'react';
import "./ErrorMetamaskConnection.css";

const error = () => (
    <div className={"ErrorMetamaskConnection"}>
        <p>Error : No connection to Metamask detected.</p>
        <p>Please install Metamask or log in to continue.</p>
    </div>
);

export default error;