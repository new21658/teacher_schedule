import axios from "axios"

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export const fetchUser = () => {
    if (typeof window == 'object') {
        return (dispatch, getState) => {
            if (Object.keys(getState().user).length > 0) return;
            axios.get('/api/user_data').then(function (res) {
                if (res.data.is_error) {
                    return window.location.replace("/login");
                }
                const data = res.data.data;
                if (data.role_id != 1) return window.location.replace("/login");
                dispatch(receiveUser(data));
                console.log("teacher id: ", data.teacher_id);
            });
        }
    }
    return (dispatch) => {
        dispatch(receiveUser({}));
    }
}
