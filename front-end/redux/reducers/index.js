import { combineReducers } from "redux";
import { RECEIVE_USER } from "../actions/userAction";
import { RECEIVE_TERM } from "../actions/termAction";
import { SELECT_TERM } from "../actions/scheduleAction";
import { RECEIVE_ROOM } from "../actions/roomAction"

let user = (state={}, action) => {
    console.log("user action:", action);
    switch(action.type) {
        case RECEIVE_USER : return state = action.payload;
        default : return state;
    }
    return state;
}

let terms = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_TERM: {
            return action.payload; 
        }
        default : return state;
    }
    return state;
}

let schedule = (state={
    termSelected: -1
}, action) => {
    switch(action.type) {
        case SELECT_TERM : {
            return Object.assign({}, { termSelected: action.payload })
        }
        default : return state;
    }
    return state;
}

let courses = (state=[], action) => {
    console.log("coureses:", state);
    return state;
}

let rooms = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_ROOM : return action.payload;
        default: return state;
    }
    return state;
}


export default combineReducers({
    user: user,
    terms: terms,
    courses: courses,
    rooms: rooms,
    schedule: schedule
});