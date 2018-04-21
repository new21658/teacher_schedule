import { combineReducers } from "redux";
import { RECEIVE_USER } from "../actions/userAction";
import { RECEIVE_TERM } from "../actions/termAction";
import { RECEIVE_ROOM } from "../actions/roomAction"
import { RECEIVE_COURSES } from "../actions/courseAction"
import { FETCH_OWN_COURSES, RECEIVE_OWN_COURSES } from "../actions/ownCourseAction"

import schedule from "./scheduleReducer"
import test from "./testReducer"
import testSchedule from "./testScheduleReducer"

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



let courses = (state=[], action) => {
    switch(action.type) {
        case RECEIVE_COURSES: return action.payload
        default: return state;
    }
    return state;
}

let ownCourses = (state=[], action) => {
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
    ownCourses: ownCourses,
    rooms: rooms,
    schedule: schedule,
    loader: loader,
    tests: test,
    testSchedule: testSchedule
});