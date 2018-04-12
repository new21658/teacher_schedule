export const FETCH_OWN_COURSES = 'FETCH_OWN_COURSES';
export const RECEIVE_OWN_COURSES = 'RECEIVE_OWN_COURSES';


import axios from "axios";

export const fetchOwnCourses = ({ term, teacher, status, responsed  }) => {

    return (dispatch) => {
        // console.log("/api/course_all?term=" + (term || "") + "&teacher=" + (teacher || "") + "&status=" + (status || "A") + "&responsed=" + (responsed));
        axios.get("/api/course_all?term=" 
            + (term || "") + "&teacher=" + (teacher || "") 
            + "&status=" + (status || "A") 
            + "&responsed=" + (responsed == 0 ? 0 : 1)).then(res => {

            const data = res.data;

            if(data.is_error) {

                console.log(data.error_message)

                return window.alert(data.error_message)

            }
            
            dispatch({
                type: RECEIVE_OWN_COURSES,
                payload: data.data
            })

        }),

        error => {
            console.error(error)
        }

    }

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