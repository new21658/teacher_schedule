import { connect } from "react-redux";
import Header from "../components/Header";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: Object.keys(state.user).length > 0,
        name: state.user.full_name
    }
}

export default connect(mapStateToProps, null)(Header);