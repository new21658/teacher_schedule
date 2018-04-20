import axios from "axios"

export const RECEIVE_ROOM = 'RECEIVE_ROOM';


export const receiveRooms = (rooms) => {
    return {
        type: RECEIVE_ROOM,
        payload: rooms
    }
}

export const fetchRooms = () => {
    return (dispatch, getState) => {
        if(getState().rooms.length > 0) return;
        axios.get('/api/study_room_all?status=A').then((res) => {
            const data = res.data.data;
            dispatch(receiveRooms(data));
        });
    }
}