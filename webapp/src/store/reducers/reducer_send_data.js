import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    error: null,
    loading: false,
    dataID: 0,
    formData: null
};

const uploadStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    });
};

const uploadSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        dataID: action.dataID,
        formData: action.formData
    });
};

const uploadFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.send_data_START: return uploadStart(state, action);
        case actionTypes.send_data_SUCCESS: return uploadSuccess(state, action);
        case actionTypes.send_data_FAIL: return uploadFail(state, action);

        default:
            return state;
    }
};

export default reducer;
