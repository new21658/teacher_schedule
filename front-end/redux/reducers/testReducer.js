import { RECEIVE_TESTS } from "../actions/testAction"

export default function testReducer(state=[], action) {
    switch(action.type) {
        case RECEIVE_TESTS: return action.payload;
        default:  return state;
    }
    return state;
}