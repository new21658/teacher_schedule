import { connect } from "react-redux"
import Menu from "../components/Menu"


const mapStateToProps = (state) => {
    return {
        isLoggedIn: Object.keys(state.user).length > 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)


