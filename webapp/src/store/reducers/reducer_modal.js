import * as actionTypes from "../actions/actions_names";
import { updateObject } from '../utility';

const initialState = {
    modalOpen: false,
};

const modalOpen = state => {
    return updateObject(state, {
        modalOpen: true,
    });
};

const modalClose = state => {
    return updateObject(state, {
        modalOpen: false,
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.modal_OPEN: return modalOpen(state, action);
        case actionTypes.modal_CLOSE: return modalClose(state, action);

        default:
            return state;
    }
};

export default reducer;