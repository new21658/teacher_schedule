
import axios from "axios"

export const RECEIVE_TESTS = 'RECEIVE_TESTS'

export const FETCH_TESTS = 'FETCH_TESTS'


export const receiveTests = (tests) => {
    return {
        type: RECEIVE_TESTS,
        payload: tests
    }
}

export const fetchTest = (args={}) => {
    return (dispatch, getState) => {
        axios.get('/api/test_all', {
            params: {
                term: args && args.term || getState().testSchedule.termSelected || '',
                status: args && args.status || 'A',
                ...args
            }
        }).then((res) => {
            if(res.data.is_error) {
                console.error(res.data.error_message)
                return window.alert(res.data.error_message)
            }
            dispatch(receiveTests(res.data.data));
        })
    }
}