
export const CHANGE_TERM = 'CHANGE_TERM'
export const CHANGE_TYPE = 'CHANGE_TYPE'


export const changeTerm = (term) => ({
    type: CHANGE_TERM,
    payload: term
})

export const changeType = (type) => ({
    type: CHANGE_TYPE,
    payload: type
})