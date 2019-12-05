import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    modalErrorOpen: false,
};

const modalErrorOpen = state => {
    return updateObject(state, {
        modalErrorOpen: true,
    });
};

const modalErrorClose = state => {
    return updateObject(state, {
        modalErrorOpen: false,
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.modal_OPEN_ERROR: return modalErrorOpen(state, action);
        case actionTypes.modal_CLOSE_ERROR: return modalErrorClose(state, action);

        default:
            return state;
    }
};

export default reducer;