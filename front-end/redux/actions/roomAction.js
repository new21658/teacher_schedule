
export const RECEIVE_ROOM = 'RECEIVE_ROOM';


export const receiveRoom = (rooms) => {
    return {
        type: RECEIVE_ROOM,
        payload: rooms
    }
}