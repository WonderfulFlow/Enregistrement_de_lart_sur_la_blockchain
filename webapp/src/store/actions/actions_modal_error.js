import * as actionTypes from "./actions_names";

export const openErrorModal = () => {
    return {
        type: actionTypes.modal_error_OPEN
    };
};

export const closeErrorModal = () => {
    return {
        type: actionTypes.modal_error_CLOSE
    }
};