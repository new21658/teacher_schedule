
export const RECEIVE_TERM = 'RECEIVE_TERM'


export const receiveTerm = (terms) => {
    return {
        type: RECEIVE_TERM,
        payload: terms        
    }
};