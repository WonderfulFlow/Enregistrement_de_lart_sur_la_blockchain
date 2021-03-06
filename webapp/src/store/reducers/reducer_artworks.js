import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    error: null,
    loading: false,
    dataID: 0,
    formData: null,
    data: null
};

const artworksStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true
    });
};

const artworksGetSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
    });
};

const artworksSendSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        dataID: action.dataID,
        formData: action.formData
    });
};

const artworksFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.artworks_START: return artworksStart(state, action);
        case actionTypes.artworks_GET_SUCCESS: return artworksGetSuccess(state, action);
        case actionTypes.artworks_SEND_SUCCESS: return artworksSendSuccess(state, action);
        case actionTypes.artworks_FAIL: return artworksFail(state, action);

        default:
            return state;
    }
};

export default reducer;
