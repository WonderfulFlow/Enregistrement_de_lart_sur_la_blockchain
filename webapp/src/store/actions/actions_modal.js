import * as actionTypes from "./actions_names";

export const openModal = () => {
    return {
        type: actionTypes.modal_OPEN
    };
};

export const closeModal = () => {
    return {
        type: actionTypes.modal_CLOSE
    }
};