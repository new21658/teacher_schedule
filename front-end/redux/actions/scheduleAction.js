export const SELECT_TERM = 'SELECT_TERM';
export const SELECT_TIME = 'SELECT_TIME';


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