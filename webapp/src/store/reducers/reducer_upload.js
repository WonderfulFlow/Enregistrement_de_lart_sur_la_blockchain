import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    error: null,
    loading: false,
    uploadedImage: null,
    original_height: 0,
    original_width: 0,
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
        uploadedImage: action.uploadedImage,
        original_height: action.original_height,
        original_width: action.original_width,
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
        case actionTypes.upload_START: return uploadStart(state, action);
        case actionTypes.upload_SUCCESS: return uploadSuccess(state, action);
        case actionTypes.upload_FAIL: return uploadFail(state, action);

        default:
            return state;
    }
};

export default reducer;
