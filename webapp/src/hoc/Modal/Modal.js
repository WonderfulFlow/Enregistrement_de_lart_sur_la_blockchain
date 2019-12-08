import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50, left = 50, width = 80, height = 80;

    return {
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const content = props.children;

    return (
        <div>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={props.isOpen} onClose={props.closeModal}>
                <div style={{...modalStyle}} className={classes.paper}>
                    {content}
                </div>
            </Modal>
        </div>
    );
}

export default SimpleModal;