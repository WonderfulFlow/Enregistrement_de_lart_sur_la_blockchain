import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
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
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if(props.checkFormValidity()){
            setOpen(true);
        } else {
            alert("Veuillez remplir le formulaire");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const content = props.children;

    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                Suivant
            </Button>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={open} onClose={handleClose}>
                <div style={{...modalStyle, width: props.original_width + 200}} className={classes.paper}>
                    {content}
                </div>
            </Modal>
        </div>
    );
}

export default SimpleModal;