export const FETCH_OWN_COURSES = 'FETCH_OWN_COURSES';
export const RECEIVE_OWN_COURSES = 'RECEIVE_OWN_COURSES';


import axios from "axios";

export const fetchOwnCourses = () => {
    return {
        type: FETCH_OWN_COURSES
    }
}

export const receiveOwnCourses = (courses) => {
    return {
        type: RECEIVE_OWN_COURSES,
        payload: courses
    }
}