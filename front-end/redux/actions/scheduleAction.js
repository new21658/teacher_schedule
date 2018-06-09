export const SELECT_TERM = 'SELECT_TERM';
export const SELECT_TIME = 'SELECT_TIME';
export const CHANGE_START_TIME ='CHANGE_START_TIME';
export const CHANGE_END_TIME = 'CHNGE_END_TIME';  
export const CHANGE_DAY = 'CHANGE_DAY';
export const CHANGE_COURSE = 'CHANGE_COURSE'; 
export const CHANGE_ROOM = 'CHANGE_ROOM';
export const TRIGGER_TIME_OVERLAPS = 'TRIGGER_TIME_OVERLAPS';

import axios from "axios";

import { fetchCourses } from "./courseAction"
import { fetchOwnCourses } from "./ownCourseAction"

export const selectTerm = (term) => {
    return {
        type: SELECT_TERM,
        payload: term
    }
}

export const selectTime = (day, start, end) => {
    return {
        type: SELECT_TIME,
        payload: { day, start, end, format: 'HH:mm' }
    }
}

export const changeStartTime = (time) => {
    return {
        type: CHANGE_START_TIME,
        payload: time
    }
}

export const changeEndTime = (time) => {
    return {
        type: CHANGE_END_TIME,
        payload: time
    }
}

export const changeDay = (day) => {
    return {
        type: CHANGE_DAY,
        payload: day
    }
}

export const changeCourse = (course) => {
    return {
        type: CHANGE_COURSE,
        payload: course
    }
}

export const changeRoom = (room) => {
    return {
        type: CHANGE_ROOM,
        payload: room
    }
}

export const triggerTimeOverlaps = (isOverlaps) => {
    return {
        type: TRIGGER_TIME_OVERLAPS,
        payload: isOverlaps
    }
}

export const startBooking = () => {

    return (dispatch, getState) => {
        const state = getState();
        const  schedule = getState().schedule;

        axios.post('/api/course_booking', {
            term: schedule.termSelected,
            course: schedule.courseSelected,
            day: schedule.daySelected,
            room: schedule.roomSelected,
            start_time: schedule.startTimeSelected,
            end_time: schedule.endTimeSelected
        }).then( res => {

            console.log(res);

            if(res.data.is_error) {
                return window.alert(res.data.error_message)
            }

            const data = res.data.data;
            
            dispatch(
                fetchCourses({ 
                    term: schedule.termSelected, 
                    responsed: 1, 
                    room: schedule.roomSelected 
                })
            );

            dispatch(
                fetchOwnCourses({
                    teacher: state.user.teacher_id,
                    term: schedule.termSelected
                })
            )

            dispatch(
                changeCourse(-1)
            )
            

            window.alert("จองตารางเรียบร้อยแล้ว")

        }, error => {
            console.error(error);
            window.alert("Error " + error.toString());
        })

    }
}

// export const booking = (dispatch, course, room, day, start, end) => {

// }