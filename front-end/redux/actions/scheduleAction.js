export const SELECT_TERM = 'SELECT_TERM';
export const SELECT_TIME = 'SELECT_TIME';
export const CHANGE_START_TIME ='CHANGE_START_TIME';
export const CHANGE_END_TIME = 'CHNGE_END_TIME';  
export const CHANGE_DAY = 'CHANGE_DAY';; 


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