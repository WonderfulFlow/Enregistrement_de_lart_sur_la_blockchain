import axios from "../../axios-orders";
import * as actionTypes from "./actions_names";

export const artworksSendStart = () => {
    return {
        type: actionTypes.artworks_START
    };
};

export const artworksSendSuccess = (id, formData) => {
    return {
        type: actionTypes.artworks_SUCCESS,
        dataID: id,
        formData: formData
    };
};

export const artworksSendFail = (error) => {
    return {
        type: actionTypes.artworks_FAIL,
        error: error
    };
};

export const sendData = (formData) => {
    return dispatch => {
        dispatch(artworksSendStart());

        axios.post('/artwork.json', formData)
            .then(response => {
                dispatch(artworksSendSuccess(response.data.name, formData));
            })
            .catch(error => {
                dispatch(artworksSendFail(error));
            });
    };
};