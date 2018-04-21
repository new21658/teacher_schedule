import { CHANGE_TERM, CHANGE_TYPE } from "../actions/testSchedule"

export default function (state={
    termSeleted: -1,
    typeSelected: -1 
}, action) {
    switch(action.type) {
        case CHANGE_TERM: return Object.assign({}, state, { termSeleted: action.payload })
        case CHANGE_TYPE: return Object.assign({}, state, { typeSelected: action.payload })
        default : return state;
    } 
    return state;
}