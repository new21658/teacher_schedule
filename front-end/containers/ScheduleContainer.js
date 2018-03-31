import { connect } from "react-redux";
import Schedule from "../components/index/Schedule";
import { selectTerm } from "../redux/actions/scheduleAction";

const mapStateToProps = (state) => {
    return {
        terms: state.terms,
        courses: state.courses,
        rooms: state.rooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTerm: (term) => {
            dispatch(selectTerm(term));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);