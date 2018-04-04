import { combineReducers } from "redux";
import { RECEIVE_USER } from "../actions/userAction";
import { RECEIVE_TERM } from "../actions/termAction";
import { SELECT_TERM, SELECT_TIME } from "../actions/scheduleAction";
import { RECEIVE_ROOM } from "../actions/roomAction"
import { FETCH_OWN_COURSES, RECEIVE_OWN_COURSES } from "../actions/ownCourseAction"

let user = (state={}, action) => {
    console.log("user action:", action);
    switch(action.type) {
        case RECEIVE_USER : return state = action.payload;
        default : return state;
    }
    return state;
}

let loader = (state={}, action) => {
    switch(action.type) {
        case FETCH_OWN_COURSES: return Object.assign({}, state, { coursesFetching: true });
        case RECEIVE_OWN_COURSES: return Object.assign({}, state, { coursesFetching: false });
        default: return state;
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
    termSelected: -1,
    daySelected: -1,
    startTimeSelected: -1,
    endTimeSelected: -1
}, action) => {
    switch(action.type) {
        case SELECT_TERM : return Object.assign({}, state, { termSelected: action.payload })
        case SELECT_TIME : return Object.assign({}, state, {
                 daySelected: action.payload.day, 
                 startTimeSelected: action.payload.start, 
                 endTimeSelected: action.payload.end 
                })
        default : return state;
    }
    return state;
}

let courses = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_OWN_COURSES: return action.payload
        default: return state;
    }
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
    schedule: schedule,
    loader: loader
});