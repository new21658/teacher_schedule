
import axios from "axios"

export const RECEIVE_COURSES = 'RECEIVE_COURSES';


export const receiveCourses = (courses) => {
    return {
        type: RECEIVE_COURSES,
        payload: courses 
    }
}

export const fetchCourses = ({ term, responsed }) => {

    return (dispatch) => {

        axios.get("/api/course_all?term=" + term + "&responsed=" + (responsed == 0 ? 0 : 1)).then((res) => {

            const data = res.data;

            if(data.is_error) return window.alert(data.error_message)

            return dispatch(receiveCourses(data.data))

        })

    }
}

