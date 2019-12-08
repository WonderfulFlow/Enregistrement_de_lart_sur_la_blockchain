import axios from "../../axios-orders";
import * as actionTypes from "./actions_names";

export const sendDataStart = () => {
    return {
        type: actionTypes.send_data_START
    };
};

export const sendDataSuccess = (id, formData) => {
    return {
        type: actionTypes.send_data_SUCCESS,
        dataID: id,
        formData: formData
    };
};

export const sendDataFail = (error) => {
    return {
        type: actionTypes.send_data_FAIL,
        error: error
    };
};

export const sendData = (formData) => {
    return dispatch => {
        dispatch(sendDataStart());

        axios.post('/artwork.json', formData)
            .then(response => {
                dispatch(sendDataSuccess(response.data.name, formData));
            })
            .catch(error => {
                dispatch(sendDataFail(error));
            });
    };
};