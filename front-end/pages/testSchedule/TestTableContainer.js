import { connect } from "react-redux"
import { fetchTest } from "../../redux/actions/testAction"
import { changeTerm, changeType } from "../../redux/actions/testSchedule"



const mapStateToProps = (state) => {
    return {
        testSchedule: state.testSchedule,
        terms: state.terms,
        tests: state.tests.filter(t => t.type == state.testSchedule.typeSelected)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTerm: function(term) {
            dispatch(changeTerm(term))
            dispatch(fetchTest({ term: term }))
        },
        changeType: function(type) {
            dispatch(changeType(type))
        }
    }
}



export default function withConnect(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component)
}