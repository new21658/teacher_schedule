import { connect } from "react-redux";
import Schedule from "../components/index/Schedule";
import { selectTerm, selectTime } from "../redux/actions/scheduleAction";

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        courses: state.courses,
        rooms: state.rooms,
        user: state.user,
        schedule: state.schedule
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTerm: (term) => {
            dispatch(selectTerm(term));
        },
        selectTime: (day, start, end) => {
            dispatch(selectTime(day, start, end))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);