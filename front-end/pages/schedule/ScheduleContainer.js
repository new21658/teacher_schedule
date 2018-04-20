import { connect } from "react-redux"

import { changeTerm, changeRoom } from "../../redux/actions/scheduleAction"
import { fetchCourses } from "../../redux/actions/courseAction"


const mapStateToProps = (state) => {
    return {
        courses: state.courses,
        terms: state.terms,
        rooms: state.rooms
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeTerm: function(term) {
            dispatch(changeTerm(term))
            dispatch(fetchCourses({ term: term }))
        },
        changeRoom: function(room) {
            dispatch(changeRoom(room))
            dispatch(fetchCourses({ room: room }))
        }
    }
}


export default function withConnect(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component)
}