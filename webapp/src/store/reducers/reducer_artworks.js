import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    error: null,
    loading: false,
    dataID: 0,
    formData: null
};

const artworkSendStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    });
};

const artworkSendSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        dataID: action.dataID,
        formData: action.formData
    });
};

const artworkSendFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.artworks_START: return artworkSendStart(state, action);
        case actionTypes.artworks_SUCCESS: return artworkSendSuccess(state, action);
        case actionTypes.artworks_FAIL: return artworkSendFail(state, action);

        default:
            return state;
    }
};

export default reducer;
