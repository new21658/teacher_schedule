
import axios from "axios"

export const RECEIVE_COURSES = 'RECEIVE_COURSES';


export const receiveCourses = (courses) => {
    return {
        type: RECEIVE_COURSES,
        payload: courses 
    }
}

export const fetchCourses = (args) => {

    return (dispatch, getState) => {

        axios.get("/api/course_all", {
            params: { ...args, term: args.term || getState().schedule.termSelected || -1, room: args.room || getState().schedule.roomSelected || -1, status: 'A' }
        }).then((res) => {

            const data = res.data;

            if(data.is_error) return window.alert(data.error_message)

            return dispatch(receiveCourses(data.data))

        })

    }
}

