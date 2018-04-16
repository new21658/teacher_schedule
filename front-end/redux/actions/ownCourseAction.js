export const FETCH_OWN_COURSES = 'FETCH_OWN_COURSES';
export const RECEIVE_OWN_COURSES = 'RECEIVE_OWN_COURSES';


import axios from "axios";



export const receiveOwnCourses = (courses) => {
    return {
        type: RECEIVE_OWN_COURSES,
        payload: courses
    }
}

export const fetchOwnCourses = (args) => {

    return (dispatch, getState) => {
        dispatch({ 
            type: FETCH_OWN_COURSES
         })
        axios.get("/api/course_all", {
            params: { ...args, teacher: getState().user.teacher_id || '', status: "A" }
        }).then(res => {

            const data = res.data;

            if(data.is_error) {

                console.log(data.error_message)

                return window.alert(data.error_message)

            }
            
            dispatch(receiveOwnCourses(data.data))

        }),

        error => {
            console.error(error)
        }
    }
}
