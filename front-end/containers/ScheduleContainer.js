import { connect } from "react-redux";
import Schedule from "../components/index/Schedule";
import { selectTerm, selectTime, changeDay, changeStartTime, changeEndTime, changeCourse } from "../redux/actions/scheduleAction";
import axios from 'axios'

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        courses: state.courses.filter((c) => {
            return state.schedule.termSelected == c.term_id
        }),
        rooms: state.rooms,
        user: state.user,
        schedule: state.schedule
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        selectTerm: (term) => {
            dispatch(selectTerm(term));
        },
        selectTime: (day, start, end) => {
            dispatch(selectTime(day, start, end))
        },
        changeDay: (day) => {
            dispatch(changeDay(day))
        },
        changeStartTime: (time) => {
            dispatch(changeStartTime(time))
        },
        changeEndTime: (time) => {
            dispatch(changeEndTime(time))
        },
        changeCourse: (course) => {
            dispatch(changeCourse(course));
        },
        booking: () => {
            axios.post('/api/course_booking', {

            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);