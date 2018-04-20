import axios from "axios"

export const RECEIVE_TERM = 'RECEIVE_TERM'


export const receiveTerm = (terms) => {
    return {
        type: RECEIVE_TERM,
        payload: terms        
    }
};

export const fetchTerms = () => {
    return (dispatch, getState) => {
        if(getState().terms.length > 0) return;
        axios.get('/api/term_all?status=A').then((res) => {
            const data = res.data.data;
            dispatch(receiveTerm(data));
        });
    }
}