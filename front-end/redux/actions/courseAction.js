

export const RECEIVE_COURSES = 'RECEIVE_COURSES';


export const receiveCourses = (courses) => {
    return {
        type: RECEIVE_COURSES,
        payload: courses 
    }
}