import { 
    SELECT_TERM, 
    SELECT_TIME, 
    CHANGE_START_TIME, 
    CHANGE_END_TIME, 
    CHANGE_DAY, 
    CHANGE_COURSE,
    CHANGE_ROOM,
    TRIGGER_TIME_OVERLAPS
} from "../actions/scheduleAction";



let schedule = (state={
    termSelected: -1,
    daySelected: -1,
    startTimeSelected: -1,
    endTimeSelected: -1,
    courseSelected: -1,
    roomSelected: -1,
    isOverlaps: false
}, action) => {
    switch(action.type) {
        case SELECT_TERM : return Object.assign({}, state, { termSelected: action.payload })
        case CHANGE_COURSE: return Object.assign({}, state, { courseSelected: action.payload });
        case SELECT_TIME : {
            return Object.assign({}, state, {
                daySelected: action.payload.day, 
                startTimeSelected: action.payload.start, 
                endTimeSelected: action.payload.end,
           })
        }
        case CHANGE_DAY: return Object.assign({}, state, { daySelected: action.payload});
        case CHANGE_START_TIME: return Object.assign({}, state, { startTimeSelected: action.payload});
        case CHANGE_END_TIME: return Object.assign({}, state, { endTimeSelected: action.payload});   
        case CHANGE_ROOM: return Object.assign({}, state, { roomSelected: action.payload })
        case TRIGGER_TIME_OVERLAPS: return Object.assign({}, state, { isOverlaps: action.payload })
        default : return state;
    }
    return state;
}

export default schedule;