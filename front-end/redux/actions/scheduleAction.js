export const SELECT_TERM = 'SELECT_TERM';

export const selectTerm = (term) => {
    return {
        type: SELECT_TERM,
        payload: term
    }
}