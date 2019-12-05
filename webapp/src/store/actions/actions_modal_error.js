import * as actionTypes from "./actions_names";

export const openErrorModal = () => {
    return {
        type: actionTypes.modal_OPEN_ERROR
    };
};

export const closeErrorModal = () => {
    return {
        type: actionTypes.modal_CLOSE_ERROR
    }
};